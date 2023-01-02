/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { Grid, Paper } from '@mui/material'
import Loader from '../Loader'
import { useSelector } from 'react-redux'

const SalesTableWrapper = styled('div')`
  .col-info {
    line-height: 4rem;
  }
  @media (max-width: 575px) {
    .col-info {
      font-size: 14px;
      padding: 20px 5px;
      height: 80px;
      line-height: unset;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .table-title {
      font-size: 14px;
    }
  }
`

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function Table({ salesTransactions = [], userPage }) {
  const adminUser = useSelector((state) => state?.user)

  let credit = 0
  let debit = 0
  salesTransactions?.forEach((curr) => {
    if (curr.finalValue && curr.type === 'debit') debit = debit + curr.finalValue
    if (curr.finalValue && curr.type === 'credit') credit = credit + curr.finalValue
    if (curr.finalAmount && curr.finalType === 'debit') debit = debit + curr.finalAmount
    if (curr.finalAmount && curr.finalType === 'credit') credit = credit + curr.finalAmount
  })
  return (
    <Paper elevation={4}>
      {salesTransactions?.length ? (
        <SalesTableWrapper>
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
            <Grid item xs={1.5} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5.8rem' }} className='table-title'>
              Date
            </Grid>
            {!userPage ? (
              <Grid item xs={2.5} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5.8rem' }} className='table-title'>
                Name
              </Grid>
            ) : (
              <Grid item xs={2.5} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5.8rem' }} className='table-title'>
                Reference
              </Grid>
            )}
            <Grid item xs={4} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5.8rem' }} className='table-title'>
              Description
            </Grid>
            <Grid item xs={4} container alignItems='baseline'>
              <Grid item xs={12} style={{ borderBottom: '2px solid rgb(255, 137, 130)', lineHeight: '2' }} className='table-title'>
                Final Value
              </Grid>
              <Grid item xs={6} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '2.5' }} className='table-title'>
                Credit
              </Grid>
              <Grid item xs={6} className='table-title'>
                Debit
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent='center' alignItems='center' style={{ textAlign: 'center' }}>
            {(salesTransactions || []).map((t, i) => {
              return (
                <>
                  <Grid
                    item
                    xs={1.5}
                    style={{
                      ...(i !== salesTransactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                      borderRight: '2px solid rgb(255, 137, 130)'
                    }}
                    className='col-info'
                    title={new Date(t.Date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  >
                    {t.date ? new Date(t.date).toDateString() : new Date(t.Date).toDateString()}
                  </Grid>
                  <Grid
                    item
                    xs={2.5}
                    style={{
                      borderRight: '2px solid rgb(255, 137, 130)',
                      ...(i !== salesTransactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {})
                    }}
                    className='col-info'
                  >
                    {!userPage ? t.name : t.reference || 'NA'}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      borderRight: '2px solid rgb(255, 137, 130)',
                      ...(i !== salesTransactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {})
                    }}
                    className='col-info'
                  >
                    {!t.description ? (
                      <>
                        {t.quantity} {t.sign} {t.price}
                      </>
                    ) : (
                      <>{t.description}</>
                    )}
                  </Grid>
                  <Grid item xs={4} container>
                    <Grid
                      item
                      xs={6}
                      style={{
                        borderRight: '2px solid rgb(255, 137, 130)',
                        ...(i !== salesTransactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {})
                      }}
                      className='col-info'
                    >
                      {!t.description ? (
                        <>{t.type === 'credit' ? t.finalValue : '---'}</>
                      ) : (
                        <>{t.finalType === 'credit' ? t.finalAmount : '---'}</>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        ...(i !== salesTransactions.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {})
                      }}
                      className='col-info'
                    >
                      {!t.description ? (
                        <>{t.type === 'debit' ? t.finalValue : '---'}</>
                      ) : (
                        <>{t.finalType === 'debit' ? t.finalAmount : '---'}</>
                      )}
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
              <Grid item xs={1.5} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '5rem' }}>
                Total
              </Grid>
              <Grid item xs={6.5} style={{ lineHeight: '5rem' }}></Grid>
              <Grid item xs={4} container justifyContent='center' alignItems='center'>
                <Grid
                  item
                  xs={6}
                  style={{
                    borderRight: '2px solid rgb(255, 137, 130)',
                    lineHeight: '2.5rem',
                    borderLeft: '2px solid rgb(255, 137, 130)',
                    borderBottom: '2px solid rgb(255, 137, 130)',
                    overflow: 'auto'
                  }}
                >
                  {credit}
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    lineHeight: '2.5rem',
                    borderBottom: '2px solid rgb(255, 137, 130)',
                    overflow: 'auto'
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
                    textAlign: `${credit > debit ? 'left' : 'right'}`,
                    marginRight: `${credit > debit ? '0' : '17%'}`,
                    paddingLeft: `${credit > debit ? '17%' : '0'}`,
                    overflow: 'auto'
                  }}
                >
                  {(Math.max(credit, debit) - Math.min(credit, debit)).toFixed(2)}
                </Grid>
              </Grid>
            </Grid>
          )}
        </SalesTableWrapper>
      ) : (
        <>
          <h2 style={{ textAlign: 'center' }}>No Trasactions Found</h2>
          <Loader />
        </>
      )}
    </Paper>
  )
}
