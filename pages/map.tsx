import { invokeWithCtx } from "@blitzjs/rpc"
import { gSSP } from "app/blitz-server"
import getAllEvents from "app/events/queries/getAllEvents"
import dynamic from "next/dynamic"
const MapComponent = dynamic(() => import("app/map/map"), {
  ssr: false,
})

export const getServerSideProps = gSSP(async ({ ctx }) => {
  const events = await invokeWithCtx(getAllEvents, {}, ctx)
  return {
    props: {
      events,
    },
  }
})

export default function Map({ events }) {
  return (
    <div className="h-[500px]">
      <h1 className="text-center p-5">Map Showing all events</h1>
      <MapComponent events={events} />
    </div>
  )
}
