import { REMOVEUSER, SETUSER } from './types'
import jwt_decode from 'jwt-decode'

let token = localStorage.jwtToken
const initialState = {
  user: token ? jwt_decode(token) : null,
  adminUser: null
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    case SETUSER:
      return {
        ...state,
        user: payload
      }
    case REMOVEUSER:
      return {
        ...state,
        user: null
      }
    default:
      return { ...state }
  }
}

export default reducer
