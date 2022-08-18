// @ts-nocheck
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useQuery, useMutation, invokeWithCtx } from "@blitzjs/rpc"

import Layout from "app/core/layouts/Layout"
import getEventToken from "app/event-tokens/queries/getEventToken"
import { gSSP } from "app/blitz-server"
import getCurrentUser from "app/users/queries/getCurrentUser"
import approveParticipant from "app/event-tokens/mutations/approveParticipant"

export const getServerSideProps = gSSP(async ({ ctx, params }) => {
  const eventToken = await invokeWithCtx(getEventToken, { id: params.eventTokenId }, ctx)
  const user = await invokeWithCtx(getCurrentUser, {}, ctx)
  if (user.role !== "ADMIN") {
    return {
      notFound: true,
    }
  }
  console.log(eventToken)
  return { props: { eventToken } }
})

export const EventToken = ({ eventToken }) => {
  const [ApproveParticipant] = useMutation(approveParticipant)
  return (
    <>
      <Head>
        <title>EventToken {eventToken.id}</title>
      </Head>

      <div className="flex flex-col items-center justify-center gap-5">
        <h1>EventToken {eventToken.id}</h1>
        {/* <pre>{JSON.stringify(eventToken, null, 2)}</pre> */}
        <p>
          User <span className="font-bold">{eventToken.user.email} </span>is requesting approval to participate in event <span className="font-bold">{eventToken.event.title}</span>
        </p>
        <p>
          Number of Seats Left <span className="font-bold">{eventToken.event.seatsLeft}</span>
        </p>
        <p>
          The event starts at <span className="font-bold">{eventToken.event.timeStart.toLocaleString()}</span>
        </p>
        <button
          type="button"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            try {
              await ApproveParticipant({ token: eventToken.hashedToken })
            } catch (e) {
              alert(e)
            }
          }}
        >
          Approve
        </button>
      </div>
    </>
  )
}

const ShowEventTokenPage = (props) => {
  return (
    <div>
      <p>
        <Link href={Routes.EventTokensPage()}>
          <a>Go back to All EventTokens</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <EventToken {...props} />
      </Suspense>
    </div>
  )
}

ShowEventTokenPage.authenticate = true
ShowEventTokenPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowEventTokenPage
