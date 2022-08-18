// @ts-nocheck
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation, invokeWithCtx } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import { Ctx } from "blitz"
import { gSSP } from "app/blitz-server"

import Layout from "app/core/layouts/Layout"
import getEvent from "app/events/queries/getEvent"
import deleteEvent from "app/events/mutations/deleteEvent"
import createToken from "app/events/mutations/createToken"
import { getSession } from "@blitzjs/auth"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const getServerSideProps = gSSP(async ({ ctx, params }) => {
  const event = await invokeWithCtx(getEvent, { id: params.eventId }, ctx)
  const user = await invokeWithCtx(getCurrentUser, {}, ctx)
  console.log(event)
  return { props: { event, user } }
})

export const Event = ({ event, user }) => {
  const router = useRouter()
  // const eventId = useParam("eventId", "number")
  const [deleteEventMutation] = useMutation(deleteEvent)
  const [createTokenMutation] = useMutation(createToken)
  console.log(event)
  // const [event] = useQuery(getEvent, { id: eventId })
  return (
    <>
      <Head>
        <title>Event {event.id}</title>
      </Head>

      <div>
        <h1 className="text-white text-center">Event {event.id}</h1>
        <div className="p-5 flex lg:flex-row flex-col items-center justify-center gap-10 w-full">
          <a
            href="#"
            className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {event.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{event.description}</p>
          </a>
          <a
            href="#"
            className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Location
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {event.latitude} {event.logitude}
            </p>
          </a>
        </div>
        <div className="p-5 flex lg:flex-row flex-col items-center justify-center gap-10 w-full">
          <a
            href="#"
            className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Timing
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              End Time : {event.timeEnd}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Start Time : {event.timeStart}
            </p>
          </a>
          <a
            href="#"
            className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Number of Seats Remaining
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{event.seatsLeft}</p>
          </a>
        </div>
        <div className="p-5 flex items-center justify-center">
          {user.role === "ADMIN" && (
            <>
              <Link href={Routes.EditEventPage({ eventId: event.id })}>
                <a className="text-white">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Edit Event
                  </button>
                </a>
              </Link>

              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={async () => {
                  if (window.confirm("This will be deleted")) {
                    await deleteEventMutation({ id: event.id })
                    router.push(Routes.EventsPage())
                  }
                }}
                style={{ marginLeft: "0.5rem" }}
              >
                Delete
              </button>
            </>
          )}
          {user && user.role !== "ADMIN" && (
            <button
              className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => {
                createTokenMutation({ eventId: event.id, email: user.email }).catch(
                  (err) => {
                    alert(err.message)
                  }
                )
              }}
              style={{ marginLeft: "0.5rem" }}
            >
              Create Registration Token
            </button>
          )}
        </div>
      </div>
    </>
  )
}

const ShowEventPage = (props) => {
  return (
    <div>
      <p>
        <Link href={Routes.EventsPage()}>
          <a>Go back to Events</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Event {...props} />
      </Suspense>
    </div>
  )
}

ShowEventPage.authenticate = true
ShowEventPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowEventPage
