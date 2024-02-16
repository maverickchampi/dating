import { linksInternals } from '@/constants/links'
import Link from 'next/link'

const Login = () => {
  return (
    <div>
      <Link href={linksInternals.landing}>
        Landing
      </Link>
      <Link href={linksInternals.home}>
        Home
      </Link>
      <Link href={linksInternals.register}>
        register
      </Link>

      <h1>
        Login
      </h1>
    </div>
  )
}

export default Login