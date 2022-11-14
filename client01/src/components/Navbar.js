import React from 'react'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'
import { logOut, logoutAdminUser } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthToken } from './utils'

function Navbar() {
  let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }
  let user = useSelector((state) => state.user)
  let adminUser = useSelector((state) => state.adminUser)

  const dispatch = useDispatch()

  return (
    <Grid
      style={{
        background: '#b92b27',
        height: 70,
        position: 'sticky',
        top: 0,
        marginBottom: '1rem',
        color: 'white'
      }}
      container
      justifyContent='space-evenly'
    >
      <Grid item xs={4} lg={3} style={{ cursor: 'pointer' }} onClick={() => goToTheRoute('/')}>
        <h4>
          {/* <i>Tax Website</i> */}
          <img src='logo.jpg' alt='logo' height={'40px'} />
        </h4>
      </Grid>
      <Grid item xs={3} lg={5} />
      <Grid item xs={5} lg={2} container>
        <Grid
          item
          xs={6}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (user || adminUser) {
              localStorage.removeItem('jwtToken')
              // Remove auth header for future requests
              setAuthToken(false)
              dispatch(logOut())
              dispatch(logoutAdminUser())
            }
            goToTheRoute('/login')
          }}
        >
          <h4>
            <p>{!user && !adminUser ? 'Login' : 'Log out'}</p>
          </h4>
        </Grid>
        {!user ? (
          <Grid item xs={6} style={{ cursor: 'pointer' }} onClick={() => goToTheRoute('/register')}>
            <h4>
              <p>Register</p>
            </h4>
          </Grid>
        ) : (
          <Grid item xs={4} style={{ cursor: 'pointer' }} onClick={() => goToTheRoute('/')}>
            <h4>
              <p>Home</p>
            </h4>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default Navbar
