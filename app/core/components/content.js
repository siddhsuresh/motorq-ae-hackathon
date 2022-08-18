import Link from "next/link"

const Content = ({ title, events, count }) => {
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
              <div className="">Number of Events</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          {events.map((event) => {
            //left the time left from today to the end of the event
            let timeLeft = event.timeEnd - Date.now()
            let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
            let hours = Math.floor(
              (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )
            let minutes = Math.floor(
              (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
            )
            let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
            return (
              <Link href="/events/[id]" as={`/events/${event.id}`} key={event.id} passHref>
                <div className="w-full md:w-4/12 cursor-pointer">
                  <div className="p-2">
                    <div className="p-4 rounded-3xl" style={{ backgroundColor: "#101010" }}>
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
                        <div className="text-sm rounded-lg flex flex-shrink-0 py-2 px-4 font-bold text-yellow-600"></div>
                        {
                          days > 0 ? (
                            <div className="text-sm rounded-lg flex flex-shrink-0 py-2 px-4 font-bold text-yellow-600">
                              {days} Days
                            </div>
                          ) : (
                            <div className="text-sm rounded-lg flex flex-shrink-0 py-2 px-4 font-bold text-yellow-600">
                              {hours} Hours
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Content
