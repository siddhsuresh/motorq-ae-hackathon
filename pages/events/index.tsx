import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getEvents from "app/events/queries/getEvents"
import Content from "app/core/components/content"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const ITEMS_PER_PAGE = 100

export const EventsList = () => {
  const router = useRouter()
  const user = useCurrentUser()
  const page = Number(router.query.page) || 0
  const [{ events, hasMore, count }] = usePaginatedQuery(getEvents, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <>
      {user && user.role === "ADMIN" && (
        <p className="p-10">
          <Link href={Routes.NewEventPage()}>
            <a>
              <button className="bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Create Event
              </button>
            </a>
          </Link>
        </p>
      )}
      <Content title="Events" events={events} count={count} />
    </>

  )
}

const EventsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Events</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <EventsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default EventsPage
