
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Discovery from './pages/Discovery.jsx'
import EventDetails from './pages/EventDetails.jsx'
import CartPage from './pages/CartPage.jsx'
import Login from './pages/Login.jsx'
import Confirmation from './pages/Confirmation.jsx'

function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState({})

  const [auth, setAuth] = useState({
    user: null,
    token: null
  })

  const handleLogin = (user, token) => {
    setAuth({ user, token })
  }

  const updateQuantity = (eventId, ticketId, change) => {
    setCart((previous) => {
      const eventQuantities = previous[eventId] || {}

      return {
        ...previous,
        [eventId]: {
          ...eventQuantities,
          [ticketId]: Math.max(
            0,
            (eventQuantities[ticketId] || 0) + change
          )
        }
      }
    })
  }

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/events`
        )

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()
        setEvents(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

return (
  <main>
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/events" replace />}
      />
      <Route
        path="/events"
        element={<Discovery events={events} />}
      />
      <Route
        path="/events/:id"
        element={
          <EventDetails
            events={events}
            cart={cart}
            onQuantityChange={updateQuantity}
          />
        }
      />
      <Route
        path="/cart"
        element={
          <CartPage
            events={events}
            cart={cart}
            auth={auth}
          />
        }
      />
      <Route
        path="/login"
        element={<Login onLogin={handleLogin} />}
      />
      <Route
        path="/confirmation"
        element={<Confirmation />}
      />
    </Routes>
  </main>
)
}
export default App
