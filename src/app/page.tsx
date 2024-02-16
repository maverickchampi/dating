import { linksInternals } from '@/constants/links'
import Link from 'next/link'

const Landing = () => {
  return (
    <>
      <main>
        <Link href={linksInternals.home}>
          Home
        </Link>
        <Link href={linksInternals.login}>
          Login
        </Link>
        <Link href={linksInternals.register}>
          Register
        </Link>
      </main>
    </>
  )
}

export default Landing
