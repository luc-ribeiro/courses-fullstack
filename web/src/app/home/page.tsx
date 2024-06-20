import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0"
import Link from "next/link"

export default withPageAuthRequired(async function Home() {
  const session = await getSession()

  return (
    <>
    <h1>Hello World, {session?.user.name}</h1>
    
    <a href="/api/auth/logout">Logout</a>
    </>
  )
}, { returnTo: '/api/auth/login' })
