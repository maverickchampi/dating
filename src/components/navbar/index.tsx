'use client'

import { linksInternals } from '@/constants/links'
import Link from 'next/link'
import './styles.scss'

const Navbar = () => {
  return (
    <nav className='component-navbar'>
      <div className='container'>
        <Link href={linksInternals.home}>
          <img src='./images/favicon.ico' alt='logo' />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar