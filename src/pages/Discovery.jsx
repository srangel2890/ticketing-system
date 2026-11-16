import EventCard from '../components/EventCard.jsx'

function Discovery({ events }) {
  return (
    <section>
      <h1>Discover Events</h1>

      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  )
}

export default Discovery