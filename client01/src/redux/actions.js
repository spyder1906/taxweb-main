import { REMOVEUSER, SETUSER, SETADMINUSER, REMOVEADMINUSER } from './types'

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

export const setAdminUser = (adminUser) => {
  return {
    type: SETADMINUSER,
    payload: adminUser
  }
}
export const logoutAdminUser = () => {
  return {
    type: REMOVEADMINUSER
  }
}
