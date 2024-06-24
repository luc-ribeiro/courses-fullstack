import { ApolloClient, InMemoryCache, createHttpLink, type NormalizedCacheObject, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import getAuth0Token from "@/actions/get-auth0-token";
import type { GetServerSidePropsContext } from "next";

export type ApolloClientContext = GetServerSidePropsContext

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
