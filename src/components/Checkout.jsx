
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout({ events, cart, auth }) {
  const navigate = useNavigate()

  const [attendees, setAttendees] = useState({})
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const selectedTickets = events.flatMap((event) =>
    event.ticket_types.flatMap((ticket) => {
      const quantity = cart[event.id]?.[ticket.id] || 0

      return Array.from({ length: quantity }, (_, index) => ({
        key: `${event.id}-${ticket.id}-${index}`,
        eventId: event.id,
        eventName: event.name,
        ticketTypeId: ticket.id,
        ticketName: ticket.name
      }))
    })
  )

  const updateAttendee = (key, field, value) => {
    setAttendees((previous) => ({
      ...previous,
      [key]: {
        ...previous[key],
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!auth?.token) {
      navigate('/login', { state: { from: '/cart' } })
      return
    }

    const eventIds = [...new Set(
      selectedTickets.map((ticket) => ticket.eventId)
    )]

    if (eventIds.length !== 1) {
      setError('Please reserve tickets for one event at a time.')
      return
    }

    const tickets = selectedTickets.map((ticket) => ({
      ticket_type_id: ticket.ticketTypeId,
      attendee_name: attendees[ticket.key]?.name?.trim(),
      attendee_email: attendees[ticket.key]?.email?.trim()
    }))

    setSubmitting(true)

    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_BASE_URL}/reservations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
          },
          body: JSON.stringify({
            reservation: {
              event_id: eventIds[0],
              tickets
            }
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.error)
            ? data.error.join(', ')
            : data.error || 'Reservation failed'
        )
      }

      navigate('/confirmation', {
        state: { reservation: data }
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (selectedTickets.length === 0) {
    return null
  }

  return (
    <section className="checkout">
      <h2>Attendee Information</h2>

      <form onSubmit={handleSubmit}>
        {selectedTickets.map((ticket, index) => (
          <fieldset key={ticket.key}>
            <legend>
              Ticket {index + 1} — {ticket.eventName}
              {' '}({ticket.ticketName})
            </legend>

            <label>
              Full name
              <input
                type="text"
                required
                value={attendees[ticket.key]?.name || ''}
                onChange={(e) =>
                  updateAttendee(ticket.key, 'name', e.target.value)
                }
              />
            </label>

            <label>
              Email
              <input
                type="email"
                required
                value={attendees[ticket.key]?.email || ''}
                onChange={(e) =>
                  updateAttendee(ticket.key, 'email', e.target.value)
                }
              />
            </label>
          </fieldset>
        ))}

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Reserving...' : 'Reserve Tickets'}
        </button>
      </form>
    </section>
  )
}

export default Checkout
