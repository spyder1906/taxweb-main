import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { setAuthToken } from '../utils'
import { setAdminUser } from '../../redux/actions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'
import Loader from '../Loader'

function Login() {
  let [state, setState] = useState({
    email: '',
    password: '',
    errors: {}
  })
  let [loading, setLoading] = useState(false)

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state?.adminUser)
  function goToTheRoute(route) {
    navigate(route)
  }

  if (user?.role === 'admin') goToTheRoute('/dashboard')

  function onChange(e) {
    setState({ ...state, [e.target.id]: e.target.value })
  }

  function onSubmit(e) {
    setLoading(true)
    e.preventDefault()
    axios
      .post(process.env.REACT_APP_API_URL + '/api/admin/authenticate', state)
      .then((res) => {
        const { accesstoken: token } = res.data
        console.log(token)
        localStorage.setItem('jwtToken', token)
        setAuthToken(token, true)
        const decoded = jwt_decode(token)
        localStorage.setItem('jwtToken', token)
        dispatch(setAdminUser(decoded))
        if (decoded.role !== 'admin') this.setState({ ...state, errors: { email: 'You are not a admin' } })
        else goToTheRoute('/dashboard')
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => this.setState({ ...state, errors: { email: 'Invalid credentials' } }))
    setLoading(false)
  }

  const { errors } = state

  return (
    <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center' style={{ minHeight: '60vh' }}>
      <Grid>
        <div className='col s12' style={{ paddingLeft: '11.250px' }}>
          <h2>
            <b>Admin Login</b>
          </h2>
          <p className='grey-text text-darken-1'>{/* Don't have an account? <Link to="/register">Register</Link> */}</p>
        </div>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            fullWidth
            id='email'
            name='email'
            label='Email'
            value={state.email}
            onChange={onChange}
            error={errors?.email && errors?.emailnotfound}
            style={{ marginBottom: '0.3rem' }}
          />
          <TextField
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            value={state.password}
            onChange={onChange}
            error={errors?.password && errors?.passwordincorrect}
            style={{ marginBottom: '0.3rem' }}
          />
          {loading ? (
            <Loader count={2} />
          ) : (
            <div className='col s12' style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <Button style={{ background: '#b92b27', width: '150px' }} color='secondary' variant='contained' type='submit'>
                Submit
              </Button>
              <Button
                style={{ background: '#b92b27', width: '150px', marginLeft: '2rem' }}
                color='secondary'
                variant='contained'
                onClick={() => goToTheRoute('/admin/register')}
              >
                Register
              </Button>
            </div>
          )}
        </form>
      </Grid>
    </Grid>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default Login
