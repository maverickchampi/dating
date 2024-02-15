import { ResponseError } from '@/utils/errors'
import { useState } from 'react'

interface IHandleFetch {
  path: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: Object
  params?: Record<string, string | number>
  headers?: Record<string, string>
  hasToken?: boolean
}

const useFetch = () => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [controller, setController] = useState<AbortController | null>(null)

  const handleFetch = ({
    path,
    method = 'GET',
    body,
    params,
    headers,
    hasToken,
  }: IHandleFetch) => {
    const abortController = new AbortController()
    setController(abortController)
    setResponse(null)
    setLoading(true)
    setError(null)

    let url = `/api${path}`
    if (params) {
      const paramsParsed = Object.entries(params).map(([key, value], index) => {
        return `${index === 0 ? '' : '&'}${key}=${value}`
      })

      url = `${url}?${paramsParsed.join('')}`
    }

    const requestBody = body instanceof FormData ? body : JSON.stringify(body)

    fetch(url.toString(), {
      method,
      body: requestBody,
      headers: {
        ...(hasToken && {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
        ...(!(body instanceof FormData) && {
          'Content-Type': 'application/json',
        }),
        ...headers,
      },
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((json) => {
        if(!json.success) {
          throw new ResponseError(json.message)
        }

        setResponse(json.data)
      })
      .catch((error) => {
        if (abortController.signal.aborted) {
          return setError('Request canceled')
        }

        if (error instanceof ResponseError) {
          return setError(error.message)
        }

        setError('Internal server error')
      })
      .finally(() => {
        setController(null)
        setLoading(false)
      })
  }

  const handleCancel = () => {
    if (controller) {
      controller.abort()
      setError('Request canceled')
    }
  }

  return { handleFetch, loading, response, error, handleCancel }
}

export default useFetch