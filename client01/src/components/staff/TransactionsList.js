import React, { useState } from 'react'
import { Button, Grid, Paper } from '@mui/material'
import AddAndEditTransaction from './AddAndEditTransaction'
import Modal from '../Modal'
import { useEffect } from 'react'
import axios from 'axios'
import TransactionTable from './TransactionsTable'
import { useNavigate } from 'react-router-dom'
const apiURL = process.env.REACT_APP_API_URL

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function TransactionsList() {
  const [add, setAdd] = useState(false)
  const [transactions, setTransactions] = useState(null)
  let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }
  useEffect(() => {
    axios.get(`${apiURL}/api/transactions/get`).then(function (response) {
      setTransactions(response.data?.transactions || [])
    })
  }, [add])

  return (
    <Grid style={{ padding: '5%' }}>
      <Grid style={{ marginRight: '10%', marginLeft: '10%', border: '2px solid #b92b27' }}>
        <Paper elevation={6}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item md={4} sm={4} lg={2} style={{ textAlign: 'center', fontFamily: 'system-ui' }}>
              <Button variant='contained' size='small' onClick={() => goToTheRoute('/dashboard')}>
                Go To Dashboard
              </Button>
            </Grid>
            <Grid item md={4} sm={4} lg={8} style={{ textAlign: 'center', fontFamily: 'system-ui' }}>
              <h2>Transactions for Amount & Commision</h2>
            </Grid>
            <Grid item md={4} sm={4} lg={2}>
              <Button variant='contained' size='small' onClick={() => setAdd(true)}>
                Add Transaction
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Grid>
          <TransactionTable transactions={transactions} userPage />
        </Grid>
        <Modal
          isOpen={add}
          onClose={() => {
            setAdd(false)
          }}
        >
          <AddAndEditTransaction
            onClose={() => {
              setAdd(false)
            }}
          />
        </Modal>
      </Grid>
    </Grid>
  )
}
