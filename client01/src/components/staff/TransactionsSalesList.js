/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Grid, Paper } from '@mui/material'
import AddAndEditSales from './AddAndEditSales'
import Modal from '../Modal'
import { useEffect } from 'react'
import axios from 'axios'
import SalesTable from './SalesTable'
import { useNavigate } from 'react-router-dom'
const apiURL = process.env.REACT_APP_API_URL

export default function SaleTransactionsList() {
  const [add, setAdd] = useState(false)
  const [transactions, setTransactions] = useState(null)
  let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }
  useEffect(() => {
    axios.get(`${apiURL}/api/saleTransactions/get`).then(function (response) {
      setTransactions(response.data?.transactions || [])
    })
  }, [add])

  return (
    <Grid style={{ padding: '5%' }}>
      <Grid style={{ marginRight: '10%', marginLeft: '10%', border: '2px solid rgb(255, 137, 130)' }}>
        <Paper elevation={6}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item md={4} sm={4} lg={2} style={{ textAlign: 'center', fontFamily: 'system-ui' }}>
              <Button variant='contained' size='small' onClick={() => goToTheRoute('/dashboard')}>
                Go To Dashboard
              </Button>
            </Grid>
            <Grid item md={4} sm={4} lg={8} style={{ textAlign: 'center', fontFamily: 'system-ui' }}>
              <h2>Transactions for Sale & Purchase</h2>
            </Grid>
            <Grid item md={4} sm={4} lg={2}>
              <Button variant='contained' size='small' onClick={() => setAdd(true)}>
                Add Transaction
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Grid>
          <SalesTable salesTransactions={transactions} userPage />
        </Grid>
        <Modal
          isOpen={add}
          onClose={() => {
            setAdd(false)
          }}
        >
          <AddAndEditSales
            onClose={() => {
              setAdd(false)
            }}
          />
        </Modal>
      </Grid>
    </Grid>
  )
}
