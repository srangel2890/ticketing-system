
import { Link } from 'react-router-dom'
import Cart from '../components/Cart.jsx'
import Checkout from '../components/Checkout.jsx'

function CartPage({ events, cart, auth }) {
  const hasTickets = Object.values(cart).some(
    (quantities) =>
      Object.values(quantities).some((quantity) => quantity > 0)
  )

  return (
    <section>
      <Link to="/events">Continue browsing</Link>
      <h1>Shopping Cart</h1>
      <Cart events={events} cart={cart} />
      {hasTickets && (
        <Checkout events={events} cart={cart} auth={auth} />
      )}
    </section>
  )
}
export default CartPage
