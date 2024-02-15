import { useEffect, useState } from 'react'

const useMediaQuery = (width: number): boolean => {
  const query = `(min-width: ${width}px)`
  
  const getMatches = (query: string): boolean => {
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    handleChange()
    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [width])

  return matches
}

export default useMediaQuery