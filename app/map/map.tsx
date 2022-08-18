// @ts-nocheck
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
// import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from "leaflet"
import { Routes } from "@blitzjs/next"
import Link from "next/link"

export default function MapComponent({ events }) {
  const position = [23.259933, 77.412613]
  console.log(events)
  return (
    <MapContainer center={position} zoom={4} scrollWheelZoom={true} style={{ height: "500px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={position} icon={new Icon({
            iconUrl: "/marker-icon.png",
        })}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.latitude, event.logitude]}
          icon={
            new Icon({
              iconUrl: "/marker-icon.png",
            })
          }
        >
          <Popup>
            <div>
              <Link href={Routes.ShowEventPage({ eventId: event.id })}>
                <a>{event.title}</a>
              </Link>
              <p>{event.description}</p>
              <p>{event.seatsLeft} Seats Left</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
