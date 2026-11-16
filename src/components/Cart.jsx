function Cart({ events, cart }) {
  const items = events.flatMap((event) =>
    event.ticket_types
      .filter((ticket) => (cart[event.id]?.[ticket.id] || 0) > 0)
      .map((ticket) => ({
        eventId: event.id,
        ticketId: ticket.id,
        eventName: event.name,
        ticketName: ticket.name,
        price: Number(ticket.price),
        quantity: cart[event.id][ticket.id]
      }))
  )

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (items.length === 0) {
    return <p>Your cart is empty.</p>
  }

  return (
    <section className="cart">
      <h2>Your Cart</h2>

      {items.map((item) => (
        <div key={`${item.eventId}-${item.ticketId}`}>
          <h3>{item.eventName}</h3>
          <p>
            {item.ticketName} × {item.quantity}
          </p>
          <p>Subtotal: ${item.price * item.quantity}</p>
        </div>
      ))}

      <h3>Total: ${total}</h3>
    </section>
  )
}

export default Cart