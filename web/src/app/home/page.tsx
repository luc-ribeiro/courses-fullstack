import { GET_USER_INFO } from '@/graphql/queries/me'
import { FETCH_PRODUCTS } from '@/graphql/queries/products'
import { createApolloClient } from '@/lib/apollo'
import { getAccessToken, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0"

async function Home() {
  const session = await getSession()

  const apolloClient = createApolloClient()
  const { data, loading, error } = await apolloClient.query({ query: GET_USER_INFO })

  return (
    <>
      <h1>Hello World, {session?.user.name}</h1>

      <a href="/api/auth/logout">Logout</a>
    </>
  )
}

export default withPageAuthRequired(Home, { returnTo: '/api/auth/login' })