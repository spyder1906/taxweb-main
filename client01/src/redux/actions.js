import { REMOVEUSER, SETUSER } from './types'

export const setUser = (user) => {
  return {
    type: SETUSER,
    payload: user
  }
}

export const logOut = () => {
  return {
    type: REMOVEUSER
  }
}
