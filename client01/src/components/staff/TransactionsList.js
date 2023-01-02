import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Button, Grid, Paper } from '@mui/material'
import TextField from '@material-ui/core/TextField'
import { DateRangePicker, DateRangeDelimiter, LocalizationProvider } from '@material-ui/pickers'
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns'
import Modal from '../Modal'
import TransactionTable from './TransactionsTable'
import AddAndEditTransaction from './AddAndEditTransaction'
const apiURL = process.env.REACT_APP_API_URL

const TransactionsListWrapper = styled('div')`
  .transactions-part {
    padding: 0 10px;
  }
  @media (max-width: 575px) {
    .transactions-part {
      display: block;
      padding: 20px 0;
    }
    .transaction-table {
      margin: 0 !important;
    }
  }
`

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function TransactionsList() {
  const [add, setAdd] = useState(false)
  const [transactions, setTransactions] = useState(null)
  const [dateDelete, setDateDelete] = useState([])
  const [selectedDate, handleDateChange] = React.useState([null, null])
  let navigate = useNavigate()
  const adminUser = useSelector((state) => state?.user)

  function goToTheRoute(route) {
    navigate(route)
  }
  useEffect(() => {
    axios.get(`${apiURL}/api/transactions/get`).then(function (response) {
      setTransactions(response.data?.transactions || [])
    })
  }, [add])

  const filterDateData = useMemo(() => {
    let tempDetele = []
    if (selectedDate[0] === null && selectedDate[1] === null) {
      tempDetele = transactions
    } else {
      tempDetele = transactions?.filter((a) => {
        return (
          new Date(a.Date).getDate() >= new Date(selectedDate[0]).getDate() &&
          new Date(a.Date).getDate() <= new Date(selectedDate[1]).getDate() &&
          new Date(a.Date).getMonth() >= new Date(selectedDate[0]).getMonth() &&
          new Date(a.Date).getMonth() <= new Date(selectedDate[1]).getMonth() &&
          new Date(a.Date).getFullYear() >= new Date(selectedDate[0]).getFullYear() &&
          new Date(a.Date).getFullYear() <= new Date(selectedDate[1]).getFullYear()
        )
      })
    }
    if (dateDelete.length) {
      tempDetele = tempDetele.filter((x) => {
        return !dateDelete.includes(x._id)
      })
    }
    return tempDetele
  }, [transactions, selectedDate, dateDelete])

  return (
    <TransactionsListWrapper>
      {adminUser?.role === 'admin' && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <DateRangePicker
              startText='Check-in'
              endText='Check-out'
              value={selectedDate}
              onChange={(date) => handleDateChange(date)}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <DateRangeDelimiter> to </DateRangeDelimiter>
                  <TextField {...endProps} />
                </>
              )}
            />
          </LocalizationProvider>
        </div>
      )}
      <Grid style={{ padding: '5%' }}>
        <Grid style={{ marginRight: '10%', marginLeft: '10%', border: '2px solid #b92b27' }} className='transaction-table'>
          <Paper elevation={6}>
            <Grid container justifyContent='center' alignItems='center' className='transactions-part'>
              <Grid item md={4} sm={4} lg={2} style={{ textAlign: 'center', fontFamily: 'system-ui' }}>
                <Button variant='contained' size='small' onClick={() => goToTheRoute('/dashboard')}>
                  Go To Dashboard
                </Button>
              </Grid>
              <Grid item md={4} sm={4} lg={8} style={{ textAlign: 'center', fontFamily: 'system-ui' }}>
                <h2>Transactions for Amount & Commision</h2>
              </Grid>
              <Grid item md={4} sm={4} lg={2} style={{ textAlign: 'center' }}>
                <Button variant='contained' size='small' onClick={() => setAdd(true)}>
                  Add Transaction
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Grid>
            <TransactionTable
              transactions={filterDateData}
              selectedDate={selectedDate}
              setDateDelete={setDateDelete}
              dateDelete={dateDelete}
            />
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
    </TransactionsListWrapper>
  )
}
