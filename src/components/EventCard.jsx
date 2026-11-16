import { Link } from 'react-router-dom'

function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-card-image"></div>
      <div className="event-card-content">
        <h2>{event.name}</h2>
        <p>
          {new Date(event.starts_at).toLocaleString()}
        </p>

        <p>{event.venue?.name}</p>
        <Link to={`/events/${event.id}`}>
          View Event Details
        </Link>
      </div>
    </article>
  )
}

export default EventCard