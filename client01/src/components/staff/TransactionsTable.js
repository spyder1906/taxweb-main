/* eslint-disable react/prop-types */
import React from 'react'
import { Grid, Paper } from '@mui/material'
import Loader from '../Loader'
import { useSelector } from 'react-redux'
import Checkbox from '@mui/material/Checkbox'

export default function Table({ transactions = [], selectedDate, setDateDelete, dateDelete }) {
  const adminUser = useSelector((state) => state?.user)

  let credit = 0
  let debit = 0
  transactions?.forEach((curr) => {
    if (curr.finalValue && curr.type === 'debit') debit = debit + curr.finalValue
    if (curr.finalValue && curr.type === 'credit') credit = credit + curr.finalValue
    if (curr.finalAmount && curr.finalType === 'debit') debit = debit + curr.finalAmount
    if (curr.finalAmount && curr.finalType === 'credit') credit = credit + curr.finalAmount
  })

  const handleDelete = (id) => {
    if (dateDelete.includes(id)) {
      setDateDelete((prev) => prev.filter((_id) => _id !== id))
    } else {
      setDateDelete((prev) => [...prev, id])
    }
  }
  return (
    <Paper elevation={4}>
      {transactions?.length ? (
        <>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            style={{
              textAlign: 'center',
              fontWeight: 700,
              height: '5rem',
              borderBottom: '2px solid rgb(255, 137, 130)',
              borderTop: '2px solid rgb(255, 137, 130)',
              fontSize: '18px'
            }}
          >
            <Grid item xs={3.5} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5.8rem' }}>
              Date
            </Grid>
            <Grid item xs={3.5} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5.8rem' }}>
              Name
            </Grid>
            <Grid item xs={5} container alignItems='baseline'>
              <Grid item xs={12} style={{ borderBottom: '2px solid rgb(255, 137, 130)', lineHeight: '2' }}>
                Amount
              </Grid>
              <Grid item xs={6} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '2.5' }}>
                Credit
              </Grid>
              <Grid item xs={6}>
                Debit
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent='center' alignItems='center' style={{ textAlign: 'center' }}>
            {(transactions || []).map((t, i) => {
              return (
                <>
                  <Grid
                    item
                    xs={3.5}
                    style={{
                      ...(i !== transactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                      borderRight: '2px solid rgb(255, 137, 130)',
                      lineHeight: '4rem'
                    }}
                    title={new Date(t.Date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  >
                    {selectedDate[0] && selectedDate[1] && (
                      <Checkbox sx={{ left: '-130px' }} checked={false} onClick={() => handleDelete(t._id)} />
                    )}
                    {new Date(t.Date).toDateString()}
                  </Grid>
                  <Grid
                    item
                    xs={3.5}
                    style={{
                      borderRight: '2px solid rgb(255, 137, 130)',
                      ...(i !== transactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                      lineHeight: '4rem'
                    }}
                  >
                    {t.name}
                  </Grid>
                  <Grid item xs={5} container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        borderRight: '2px solid rgb(255, 137, 130)',
                        ...(i !== transactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                        lineHeight: '4rem'
                      }}
                    >
                      {t.finalType === 'credit' ? t.finalAmount : '---'}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        ...(i !== transactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                        lineHeight: '4rem'
                      }}
                    >
                      {t.finalType === 'debit' ? t.finalAmount : '---'}
                    </Grid>
                  </Grid>
                </>
              )
            })}
          </Grid>
          {adminUser?.role === 'admin' && (
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              style={{
                textAlign: 'center',
                fontWeight: 700,
                height: '5rem',
                borderTop: '2px solid rgb(255, 137, 130)',
                fontSize: '18px'
              }}
            >
              <Grid item xs={3.5} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5rem' }}>
                Total
              </Grid>
              <Grid item xs={3.5} style={{ lineHeight: '5rem' }}></Grid>
              <Grid item xs={5} container justifyContent='center' alignItems='center'>
                <Grid
                  item
                  xs={6}
                  style={{
                    borderRight: '2px solid rgb(255, 137, 130)',
                    lineHeight: '2.5rem',
                    borderLeft: '2px solid rgb(255, 137, 130)',
                    borderBottom: '2px solid rgb(255, 137, 130)'
                  }}
                >
                  {credit}
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    lineHeight: '2.5rem',
                    borderBottom: '2px solid rgb(255, 137, 130)'
                  }}
                >
                  {debit}
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    lineHeight: '2.5rem',
                    borderLeft: '2px solid rgb(255, 137, 130)',
                    textAlign: 'right',
                    marginRight: '17%'
                  }}
                >
                  {Math.max(credit, debit) - Math.min(credit, debit)}
                </Grid>
              </Grid>
            </Grid>
          )}
        </>
      ) : (
        <>
          <h2 style={{ textAlign: 'center' }}>No Trasactions Found</h2>
          <Loader />
        </>
      )}
    </Paper>
  )
}
