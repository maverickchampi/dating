import Link from 'next/link'

const Login = () => {
  return (
    <div>
      <Link href='/'>
        Home
      </Link>
      <Link href='/register'>
        register
      </Link>

      <h1>
        Login
      </h1>
    </div>
  )
}

export default Login