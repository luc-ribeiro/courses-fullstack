import { ApolloClient, InMemoryCache, createHttpLink, type NormalizedCacheObject, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "@auth0/nextjs-auth0";
import type { GetServerSidePropsContext } from "next";

export type ApolloClientContext = GetServerSidePropsContext

async function getAuth0Token() {
  const { accessToken } = await getAccessToken()
  return accessToken
}

const httpLink = createHttpLink({
  uri: 'http://localhost:3332/graphql',
  fetch
})

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuth0Token()
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  }
})

export function createApolloClient (ssrCache?: NormalizedCacheObject) {
  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache().restore(ssrCache ?? {}),
  })
}
