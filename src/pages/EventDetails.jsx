import { Link, useParams } from 'react-router-dom'

function EventDetails({ events, cart, onQuantityChange }) {
  const { id } = useParams()
  const event = events.find((event) => String(event.id) === id)

  if (!event) {
    return <p>Event not found.</p>
  }

  const eventDate = new Date(event.starts_at)
  const isPast = eventDate < new Date()

  const quantities = cart[event.id] || {}

  const selectedTicketsCount = Object.values(quantities).reduce(
    (sum, quantity) => sum + quantity,
    0
  )

  return (
    <section className="event-details">
      <Link to="/events">Back to events</Link>

      <h1>{event.name}</h1>

      <p>{event.description || 'No description available.'}</p>

      <p>Venue: {event.venue?.name || 'To be announced'}</p>

      <p>Date: {eventDate.toLocaleString()}</p>

      <p>{isPast ? 'Event ended' : 'Upcoming event'}</p>

      <h2>Ticket Types</h2>

      {event.ticket_types.map((ticket) => {
        const quantity = quantities[ticket.id] || 0

        return (
          <div key={ticket.id}>
            <h3>{ticket.name}</h3>
            <p>${Number(ticket.price).toFixed(2)}</p>

            {!isPast && (
              <div>
                <button
                  onClick={() =>
                    onQuantityChange(event.id, ticket.id, -1)
                  }
                  disabled={quantity === 0}
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() =>
                    onQuantityChange(event.id, ticket.id, 1)
                  }
                >
                  +
                </button>
              </div>
            )}
          </div>
        )
      })}

      {!isPast && selectedTicketsCount > 0 && (
        <Link to="/cart">
          Buy Tickets ({selectedTicketsCount})
        </Link>
      )}
    </section>
  )
}

export default EventDetails