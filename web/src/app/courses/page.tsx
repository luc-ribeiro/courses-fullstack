import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { CalendarIcon } from "@heroicons/react/24/solid";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GET_USER_INFO } from "@/graphql/private/queries/me";
import { createApolloClient } from "@/lib/privateApollo";
import type { Metadata } from "next";

interface Enrollment {
  id: string;
  createdAt: string;
  course: {
    title: string;
    slug: string;
  };
}

const applicants = [
  {
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kristin Watson',
    email: 'kristin.watson@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emma Dorsey',
    email: 'emma.dorsey@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

export const metadata: Metadata = {
  title: 'Meus cursos',
};

async function Courses() {
  const apolloClient = createApolloClient()
  const { data } = await apolloClient.query({ query: GET_USER_INFO })

  return (
    <>
      <div className="bg-white">
        <div className="relative overflow-hidden bg-gray-50">
          <Header />
          <main className="py-20 max-w-7xl mx-auto ">
            <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Estudar</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Meus cursos
              </p>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-8">
              <ul role="list" className="divide-y divide-gray-200">
                {data?.me.enrollments.map((enrollment: Enrollment) => (
                  <li key={enrollment.id}>
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="font-medium text-indigo-600 truncate">{enrollment.course.title}</p>
                            <p className="ml-1 flex-shrink-0 font-normal text-gray-500">em Programação</p>
                          </div>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              <p>
                                Turma inicia em <time dateTime={enrollment.createdAt}>
                                  {dateFormatter.format(new Date(enrollment.createdAt))}
                                </time>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                          <div className="flex overflow-hidden -space-x-1">
                            {applicants.map((applicant) => (
                              <img
                                key={applicant.email}
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                src={applicant.imageUrl}
                                alt={applicant.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        <Link className="px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700" href={`/app/courses/${enrollment.course.slug}`}>
                          Assistir aulas
                        </Link>
                      </div>
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

export default withPageAuthRequired(Courses, {
  returnTo: '/api/auth/login'
})
