import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'
import axios from 'axios'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'

export default function WithMaterialUI() {
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  function onSubmit(values) {
    setLoading(true)
    if (values.password !== values.password2) {
      formik.setFieldError('password2', 'Password Mismatch')
      setLoading(false)
      return
    }
    axios
      .post(process.env.REACT_APP_API_URL + '/api/users/register', values)
      .then(() => {
        navigate('/login')
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
      <Grid>
        <form onSubmit={formik.handleSubmit}>
          <TextField
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
