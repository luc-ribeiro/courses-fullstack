'use server'

import { getAccessToken } from "@auth0/nextjs-auth0"

export default async function getAuth0Token() {
  const { accessToken } = await getAccessToken()
  return accessToken
}