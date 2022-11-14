import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import Loader from '../Loader'
import { useNavigate } from 'react-router-dom'

import { makeStyles } from '@material-ui/core'
// import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  underline: {
    '&&&:before': {
      borderBottom: 'none'
    },
    '&&:after': {
      borderBottom: 'none'
    }
  }
})

export default function WithMaterialUI() {
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const classes = useStyles()
  // const { user } = useSelector((state) => state.auth)

  // function goToTheRoute(route) {
  //   navigate(route)
  // }

  // if (user?.role === 'admin') goToTheRoute('/admin/dashboard')

  function onSubmit(values) {
    setLoading(true)
    if (values.password !== values.password2) {
      formik.setFieldError('password2', 'Password Mismatch')
      setLoading(false)
      return
    }
    axios
      .post(process.env.REACT_APP_API_URL + '/api/admin/makeadmin', values)
      .then(() => {
        navigate('/admin/login')
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        console.log(err)
        formik.setFieldError('email', 'Invalid Data')
      })
    setLoading(false)
  }

  const validationSchema = yup.object({
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required'),
    password2: yup
      .string('Enter your password')
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required')
  })

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit
  })

  return (
    <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center' style={{ minHeight: '60vh' }}>
      <Grid style={{ border: '2px solid #5B84B1FF', padding: '10px' }}>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <h5>Register As Admin</h5>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            InputProps={{ classes }}
            fullWidth
            id='name'
            name='name'
            label='Name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            style={{ marginBottom: '0.3rem' }}
          />
          <TextField
            InputProps={{ classes }}
            fullWidth
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            style={{ marginBottom: '0.3rem' }}
          />
          <TextField
            InputProps={{ classes }}
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            style={{ marginBottom: '0.3rem' }}
          />
          <TextField
            InputProps={{ classes }}
            fullWidth
            id='password2'
            name='password2'
            label='Confirm Password'
            type='password'
            value={formik.values.password2}
            onChange={formik.handleChange}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
            style={{ marginBottom: '0.3rem' }}
          />
          {loading ? (
            <Loader count={2} />
          ) : (
            <Button color='secondary' variant='contained' fullWidth type='submit'>
              Submit
            </Button>
          )}
        </form>
      </Grid>
    </Grid>
  )
}
