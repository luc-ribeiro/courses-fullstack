import { ApolloClient, InMemoryCache, createHttpLink, type NormalizedCacheObject, from } from "@apollo/client";
import type { GetServerSidePropsContext } from "next";

export type ApolloClientContext = GetServerSidePropsContext

const httpLink = createHttpLink({
  uri: 'http://localhost:3332/graphql',
  fetch
})

export function createPublicApolloClient (ssrCache?: NormalizedCacheObject) {
  return new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache().restore(ssrCache ?? {}),
  })
}
