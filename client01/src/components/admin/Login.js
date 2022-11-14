import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import jwt_decode from 'jwt-decode'
import classnames from 'classnames'
import axios from 'axios'
import { setAuthToken } from '../utils'
import { setAdminUser } from '../../redux/actions'

function Login() {
  let [state, setState] = useState({
    email: '',
    password: '',
    errors: {}
  })

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
  }

  const { errors } = state

  return (
    <div className='container'>
      <div className='row'>
        <div style={{ marginTop: '8rem' }} className='col s8 offset-s2'>
          <Link to='/' className='btn-flat waves-effect'>
            <i className='material-icons left'>keyboard_backspace</i> Back to home
          </Link>
          <div className='col s12' style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Admin Login</b>
            </h4>
            <p className='grey-text text-darken-1'>{/* Don't have an account? <Link to="/register">Register</Link> */}</p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className='input-field col s12'>
              <input
                onChange={onChange}
                value={state.email}
                id='email'
                type='email'
                className={classnames('', {
                  invalid: errors?.email || errors?.emailnotfound
                })}
              />
              <label htmlFor='email'>Email</label>
              <span className='red-text'>
                {errors?.email}
                {errors?.emailnotfound}
              </span>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={onChange}
                value={state.password}
                id='password'
                type='password'
                className={classnames('', {
                  invalid: errors?.password || errors?.passwordincorrect
                })}
              />
              <label htmlFor='password'>Password</label>
              <span className='red-text'>
                {errors?.password}
                {errors?.passwordincorrect}
              </span>
            </div>
            <div className='col s12' style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem'
                }}
                onClick={onSubmit}
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'
              >
                Login
              </button>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                  marginLeft: '2rem'
                }}
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                onClick={() => goToTheRoute('/admin/register')}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default Login
