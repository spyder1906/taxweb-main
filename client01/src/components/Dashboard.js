import React from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material'

import { useNavigate } from 'react-router-dom'

export default function UsersList() {
  let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }

  return (
    <Grid style={{ padding: '5% 15%' }}>
      <Paper elevation={4}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={12}>
            <Typography style={{ fontSize: '24px', textAlign: 'center', fontWeight: 450, padding: 10 }}>
              Dashboard for staff/Admin
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent='center'
            style={{ textAlign: 'center', margin: '20px' }}
            columns={{ xs: 4, sm: 12, md: 12 }}
            rowGap={2}
          >
            <Grid item xs={4}>
              {' '}
              <Button color='primary' variant='contained' style={{ textDecoration: 'none' }} onClick={() => goToTheRoute('/transactions')}>
                Amount and commision
              </Button>{' '}
            </Grid>
            <Grid item xs={4}>
              <Button
                color='primary'
                variant='contained'
                style={{ textDecoration: 'none' }}
                onClick={() => goToTheRoute('/transactions/sales')}
              >
                Sale And Purchase
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button color='primary' variant='contained' style={{ textDecoration: 'none' }} onClick={() => goToTheRoute('/users')}>
                Users
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
