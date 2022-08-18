// @ts-nocheck
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { invokeWithCtx, usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getEventTokens from "app/event-tokens/queries/getEventTokens"
import { gSSP } from "app/blitz-server"
import getEventToken from "app/event-tokens/queries/getEventToken"
import getCurrentUser from "app/users/queries/getCurrentUser"

const ITEMS_PER_PAGE = 100

export const getServerSideProps = gSSP(async ({ ctx }) => {
  const user = await invokeWithCtx(getCurrentUser, {}, ctx)
  if (user.role !== "ADMIN") {
    return {
      notFound: true,
    }
  }
  return {
    props: {},
  }
})

export const EventTokensList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ eventTokens, hasMore }] = usePaginatedQuery(getEventTokens, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <div className="p-10 flex flex-wrap w-full items-center justify-center gap-15">
        {eventTokens.map((eventToken) => (
          <Link href={Routes.ShowEventTokenPage({ eventTokenId: eventToken.id })} passHref>
            <div key={eventToken.hashedToken} className="cursor-pointer p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Event Request
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                User {eventToken.user.email} has requested to participate in{" "}
                {eventToken.event.title}
              </p>
              <div className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View request
                <svg
                  aria-hidden="true"
                  className="ml-2 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center gap-10">
        <button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
      </div>
    </div>
  )
}

const EventTokensPage = () => {
  return (
    <Layout>
      <Head>
        <title>EventTokens</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <EventTokensList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default EventTokensPage
