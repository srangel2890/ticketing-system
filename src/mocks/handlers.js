import { http, HttpResponse } from 'msw'

import reservationSuccess from './reservations/post_success.json'
import reservationError from './reservations/post_error.json'
import reservationHistory from './reservations/get_success.json'
import loginSuccess from './login/post_success.json'
import loginError from './login/post_error.json'
import allEvents from './events/get_all_success.json'

const API_URL = import.meta.env.VITE_API_BASE_URL

export const handlers = [
  http.get(`${API_URL}/events`, () => {
    return HttpResponse.json(allEvents, { status: 200 })
  }),

  http.post(`${API_URL}/login`, () => {
    return HttpResponse.json(loginSuccess, { status: 200 })
  }),

  http.post(`${API_URL}/reservations`, () => {
    return HttpResponse.json(reservationSuccess, { status: 201 })
  }),

  http.get(`${API_URL}/reservations`, () => {
    return HttpResponse.json(reservationHistory, { status: 200 })
  })
]

export const loginErrorHandler = http.post(
  `${API_URL}/login`,
  () => {
    return HttpResponse.json(loginError, { status: 401 })
  }
)

export const reservationErrorHandler = http.post(
  `${API_URL}/reservations`,
  () => {
    return HttpResponse.json(reservationError, { status: 422 })
  }
)