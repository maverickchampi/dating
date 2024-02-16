'use client'

import { linksInternals } from '@/constants/links'
import { useFetch } from '@/hooks'
import IAppointment from '@/interfaces/appointment.interface'
import Link from 'next/link'
import { useLayoutEffect, useState } from 'react'

const Dashboard = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([])
  const [filters, setFilters] = useState({
    page: 1,
    limit: 1,
    totalPages: 1,
    total: 0,
  })

  const {
    handleFetch: getAppointments,
    loading: loadingAppointments,
    response: responseAppointments,
    error: errorAppointments
  } = useFetch()

  useLayoutEffect(() => {
    if(errorAppointments) {
      alert(errorAppointments)
    }
    if(responseAppointments) {
      const { appointments, totalPages, total } = responseAppointments
      setAppointments(appointments)
      setFilters({
        ...filters,
        totalPages,
        total
      })
    }
  }, [loadingAppointments])

  useLayoutEffect(() => {
    getAppointments({
      path: '/appointments',
      method: 'GET',
      params: {
        page: filters.page,
        limit: filters.limit
      }
    })
  }, [filters.page, filters.limit])

  return (
    <>

      <main>
        <Link href={linksInternals.landing}>
          Landing
        </Link>
        <Link href={linksInternals.login}>
          Login
        </Link>
        <Link href={linksInternals.register}>
          register
        </Link>

        <label>Limit</label>
        <select onChange={(e) => {
          setFilters({
            ...filters,
            page: 1,
            limit: Number(e.target.value)
          })
        }}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='4'>4</option>
        </select>

        <label>Page</label>
        {Array.from({ length: filters.totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => {
              setFilters({
                ...filters,
                page: index + 1
              })
            }}
            style={{ background: filters.page === index + 1 ? 'red' : 'transparent' }}
          >{index + 1}</button>
        ))}

        {loadingAppointments
          ? <p>Loading...</p>
          : <>
              {appointments?.map((appointment) => (
                <div key={appointment._id}>
                  <p>{new Date(appointment.date).toLocaleString()}</p>
                  <p>{appointment.doctor.names}</p>
                  <p>{appointment.doctor.dad_name}</p>
                  <p>{appointment.doctor.cmp}</p>
                </div>
              ))}
            </>
        }
      </main>
    </>
  )
}

export default Dashboard
