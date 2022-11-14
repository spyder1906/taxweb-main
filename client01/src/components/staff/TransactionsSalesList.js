/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import { DateRangePicker, DateRangeDelimiter, LocalizationProvider } from '@material-ui/pickers'
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns'
import { Button, Grid, Paper } from '@mui/material'
import AddAndEditSales from './AddAndEditSales'
import Modal from '../Modal'
import SalesTable from './SalesTable'
const apiURL = process.env.REACT_APP_API_URL

export default function SaleTransactionsList() {
  const [add, setAdd] = useState(false)
  const [transactions, setTransactions] = useState(null)
  const [selectedDate, handleDateChange] = React.useState([null, null])
  let navigate = useNavigate()
  const adminUser = useSelector((state) => state?.adminUser)

  function goToTheRoute(route) {
    navigate(route)
  }
  useEffect(() => {
    axios.get(`${apiURL}/api/saleTransactions/get`).then(function (response) {
      setTransactions(response.data?.transactions || [])
    })
  }, [add])

  const filterDateData = useMemo(() => {
    if (selectedDate[0] === null && selectedDate[1] === null) {
      return transactions
    } else {
      return transactions?.filter((a) => {
        return (
          new Date(a.createdAt).getDate() >= new Date(selectedDate[0]).getDate() &&
          new Date(a.createdAt).getDate() <= new Date(selectedDate[1]).getDate() &&
          new Date(a.createdAt).getMonth() >= new Date(selectedDate[0]).getMonth() &&
          new Date(a.createdAt).getMonth() <= new Date(selectedDate[1]).getMonth() &&
          new Date(a.createdAt).getFullYear() >= new Date(selectedDate[0]).getFullYear() &&
          new Date(a.createdAt).getFullYear() <= new Date(selectedDate[1]).getFullYear()
        )
      })
    }
  }, [transactions, selectedDate])

  return (
    <>
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
            <SalesTable salesTransactions={filterDateData} userPage />
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
    </>
  )
}
