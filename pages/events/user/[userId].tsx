// @ts-nocheck
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { invokeWithCtx, useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getUserEvents from "app/events/queries/getUserEvents"
import deleteRegistration from "app/events/mutations/deleteRegistration"
import { gSSP } from "app/blitz-server"

const Content = ({ title, events, count }) => {
  const router = useRouter()
  const [DeleteRegistration] = useMutation(deleteRegistration)
  const date = new Date()
  const Day_ofDate = date.getDate()
  const monthName = date.toLocaleString("default", { month: "long" })
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-full lg:min-h-screen bg-gray-800 py-6 px-6 rounded-3xl">
        <div className="flex justify-between text-white items-center mb-8">
          <p className="text-2xl font-bold">{title}</p>
          <p className="">
            {Day_ofDate} {monthName}
          </p>
        </div>
        <div className="flex flex-wrap justify-between items-center pb-8">
          <div className="flex flex-wrap text-white">
            <div className="pr-10">
              <div className="text-2xl font-bold">{count}</div>
              <div className="">Number of Registered Events</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          {events.map((event) => (
            <Link href="/events/[id]" as={`/events/${event.id}`} key={event.id} passHref>
              <div className="w-full md:w-4/12 cursor-pointer">
                <div className="p-2">
                  <div className="p-4 rounded-3xl" style={{ backgroundColor: "#fee4cb" }}>
                    <div className="flex flex-col items-start justify-start gap-5">
                      <span className="text-sm">
                        <span className="font-bold">Event Start:</span>{" "}
                        {event.timeStart.toLocaleString()}
                      </span>
                      <span className="text-sm">
                        <span className="font-bold">Event End:</span>{" "}
                        {event.timeEnd.toLocaleString()}
                      </span>
                    </div>
                    <div className="mb-4 mt-5">
                      <p className="text-base font-bold opacity-70">{event.title}</p>
                      <p className="text-sm opacity-70 mt-2">{event.description}</p>
                      <p className="text-sm opacity-70 mt-2">
                        Number of Remaining Seats - {event.seatsLeft}
                      </p>
                    </div>
                    <div className="flex justify-between pt-4 relative">
                      <div className="text-sm rounded-lg flex flex-shrink-0 py-2 px-4 font-bold text-yellow-600">
                        2 Days Left
                      </div>
                      <button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          DeleteRegistration({
                            id: event.id,
                          })
                          router.push("/events")
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = gSSP(
    async ({ params,ctx }) => {
      console.log("Role",ctx.session.role)
        if(ctx.session.role!=="ADMIN"){
            return{
                notFound:true
            }
        }
        const events = await invokeWithCtx(getUserEvents,{userId: params.userId},ctx)
        return{
            props: {
                events: events.events
            }
        }
    }
)

export const EventsUserPageList = ({events}) => {
  console.log("events",events)
  return (
    <Content title="Events" events={events} count={events.length} />
  )
}

const EventsUserPage = ({events}) => {
  return (
    <Layout>
      <Head>
        <title>Events</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewEventPage()}>
            <a>Create Event</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <EventsUserPageList events={events}/>
        </Suspense>
      </div>
    </Layout>
  )
}

export default EventsUserPage
