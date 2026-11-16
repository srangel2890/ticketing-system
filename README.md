# Ticketing System — Frontend

## Overview

Ticketing System is a web application for discovering events, selecting tickets, and completing reservations.

The frontend is built with React and Vite. It provides a ticket purchasing interface with event details, ticket selection, a shopping cart, authentication, and checkout.

The application uses Mock Service Worker (MSW) to simulate backend API responses during frontend development.

## Tech Stack

- React
- JavaScript
- Vite
- CSS
- Mock Service Worker (MSW)

## Features

- **Event discovery:** Browse available events.
- **Event details:** View event information and available ticket types.
- **Ticket selection:** Select ticket quantities and calculate totals.
- **Shopping cart:** Review selected tickets before checkout.
- **Authentication:** Login interface for the reservation process.
- **Checkout:** Complete the reservation flow.
- **Reservation confirmation:** Display the result of a completed reservation.
- **API mocking:** Simulate successful and unsuccessful API responses using MSW.

## Project Structure

```text
src/
├── components/
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── EventCard.jsx
├── pages/
│   ├── CartPage.jsx
│   ├── Confirmation.jsx
│   ├── Discovery.jsx
│   ├── EventDetails.jsx
│   └── Login.jsx
├── mocks/
│   ├── browser.js
│   ├── handlers.js
│   ├── events/
│   ├── login/
│   └── reservations/
├── App.jsx
├── App.css
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/srangel2890/ticketing-system.git
cd ticketing-system
npm install
```

### Run the Application

```bash
npm run dev
```

Open the local URL displayed by Vite.

## API Mocking

The frontend uses MSW to intercept API requests and return predefined responses.

Mock data is organized by resource and includes scenarios for:

- Retrieving events.
- Successful and unsuccessful login attempts.
- Retrieving reservations.
- Successful and unsuccessful reservation creation.

This allows frontend functionality to be developed and tested without requiring a running backend server.

## Current Limitations

The application is still under development. Some workflows rely on mocked API responses rather than a live backend.

Planned improvements include persistent cart and authentication state, interactive venue maps, and integration with the Rails API.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
