import { linksInternals } from '@/constants/links'
import Link from 'next/link'

const Register = () => {
  return (
    <div>
      <Link href={linksInternals.landing}>
        Landing
      </Link>
      <Link href={linksInternals.home}>
        Home
      </Link>
      <Link href={linksInternals.login}>
        Login
      </Link>
      
      <h1>
        Register
      </h1>

      
    </div>
  )
}

export default Register