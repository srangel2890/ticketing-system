
import { Link, useLocation } from 'react-router-dom'

function Confirmation() {
  const location = useLocation()
  const reservation = location.state?.reservation

  if (!reservation) {
    return (
      <section>
        <p>No reservation confirmation available.</p>
        <Link to="/events">Browse events</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>Your tickets have been reserved!</h1>
      <p>Your reservation is confirmed.</p>

      <p>
        Confirmation code: {reservation.confirmation_code}
      </p>

      <Link to="/events">Back to events</Link>
    </section>
  )
}

export default Confirmation
