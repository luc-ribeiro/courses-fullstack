import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FETCH_PRODUCTS } from "@/graphql/public/queries/products";
import { createPublicApolloClient } from "@/lib/publicApollo";
import EnrollmentButton from "./components/enrollment-button";

interface Product {
  id: string
  title: string
}

export const metadata: Metadata = {
  title: 'Realizar matrícula',
};

export default async function Enroll() {
  const apolloPublicClient = createPublicApolloClient()
  
  const { data } = await apolloPublicClient.query({ query: FETCH_PRODUCTS })
  
  return (
    <>
      <div className="bg-white">
        <div className="relative overflow-hidden bg-gray-50">
          <Header />
          <main className="py-20 max-w-7xl mx-auto ">
            <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Comece a estudar</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Realizar matrícula
              </p>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-8">
              <ul role="list" className="divide-y divide-gray-200">
                {data.products.map((product: Product) => (
                  <li key={product.id}>
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="font-medium text-indigo-600 truncate">{product.title}</p>
                            <p className="ml-1 flex-shrink-0 font-normal text-gray-500">em Programação</p>
                          </div>
                        </div>
                      </div>
                      <EnrollmentButton productId={product.id} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export const revalidate = 60 * 60 // 1 hour