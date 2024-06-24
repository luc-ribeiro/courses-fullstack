'use client'

import { CREATE_PURCHASE } from "@/graphql/private/mutations/create-purchase";
import { GET_USER_INFO } from "@/graphql/private/queries/me";
import { createApolloClient } from "@/lib/privateApollo";
import {  ApolloProvider, useMutation } from "@apollo/client";

interface EnrollmentButtonProps {
  productId: string
}

function EnrollmentButtonMutation({ productId }: EnrollmentButtonProps) {
  const [createPurchase] = useMutation(CREATE_PURCHASE)

  async function handlePurchaseProduct(productId: string) {
    try {
      await createPurchase({ variables: { productId } })

      alert('Inscricão realizada com sucesso!')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="ml-5 flex-shrink-0">
      <button onClick={() => handlePurchaseProduct(productId)} className="px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700">
        Realizar inscrição
      </button>
    </div>
  )
}

export default function EnrollmentButton({ productId }: EnrollmentButtonProps) {
  const client = createApolloClient()

  return (
    <ApolloProvider client={client}>
      <EnrollmentButtonMutation productId={productId} />
    </ApolloProvider>
  )
}