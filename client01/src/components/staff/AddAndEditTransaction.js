import React, { useEffect, useState } from 'react'
import { Formik, Form, getIn, FieldArray } from 'formik'
import { Button, Grid, MenuItem, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'
import Loader from '../Loader'
const apiURL = process.env.REACT_APP_API_URL

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function AddAndEdit({ onClose }) {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  async function addTransaction(data) {
    data.transactions = data.transactions.map((t) => {
      return { name: users.find((u) => u._id === t.userId).name, ...t }
    })
    setLoading(true)
    try {
      await axios.post(`${apiURL}/api/transactions/add`, data)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
    onClose && onClose()
  }

  useEffect(() => {
    axios.get(`${apiURL}/api/taxUsers/get`).then(function (response) {
      setUsers(response.data?.taxUsers || [])
    })
  }, [])

  const operators = {
    '+': function (a, b) {
      return parseFloat(a) + parseFloat(b)
    },
    x: function (a, b) {
      return parseFloat(a) * parseFloat(b)
    },
    '-': function (a, b) {
      return parseFloat(a) - parseFloat(b)
    },
    '/': function (a, b) {
      return parseFloat(a) / parseFloat(b)
    }
  }

  return (
    <Grid>
      <h2>Add Transactions</h2>
      {loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            transactions: [{}]
          }}
          onSubmit={addTransaction}
          render={({ values, touched, errors, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <FieldArray name='transactions'>
                {({ push, remove }) => (
                  <Grid>
                    {values.transactions.map((p, index) => {
                      const acNo = `transactions[${index}].acNo`
                      const touchedAcNo = getIn(touched, acNo)
                      const errorAcNo = getIn(errors, acNo)

                      const userId = `transactions[${index}].userId`
                      const touchedUserId = getIn(touched, userId)
                      const errorUserId = getIn(errors, userId)

                      const description = `transactions[${index}].description`
                      const touchedDescription = getIn(touched, description)
                      const errorDescription = getIn(errors, description)

                      const amount = `transactions[${index}].amount`
                      const touchedAmount = getIn(touched, amount)
                      const errorAmount = getIn(errors, amount)

                      const amountType = `transactions[${index}].amountType`
                      const touchedAmountType = getIn(touched, amountType)
                      const errorAmountType = getIn(errors, amountType)

                      const commision1 = `transactions[${index}].commision1`
                      const touchedCommision1 = getIn(touched, commision1)
                      const errorCommision1 = getIn(errors, commision1)

                      const sign = `transactions[${index}].sign`
                      const touchedSign = getIn(touched, sign)
                      const errorSign = getIn(errors, sign)

                      const commision2 = `transactions[${index}].commision2`
                      const touchedCommision2 = getIn(touched, commision2)
                      const errorCommision2 = getIn(errors, commision2)

                      const finalAmount = `transactions[${index}].finalAmount`
                      const touchedFinalAmout = getIn(touched, finalAmount)
                      const errorFinalAmout = getIn(errors, finalAmount)

                      const finalType = `transactions[${index}].finalType`

                      const commision = `transactions[${index}].commision`
                      const touchedCommision = getIn(touched, commision)
                      const errorCommision = getIn(errors, commision)

                      const commisionType = `transactions[${index}].commisionType`
                      const touchedCommisionType = getIn(touched, commisionType)
                      const errorCommisionType = getIn(errors, commisionType)

                      function setFinalAmount(amount, commision) {
                        if (amount > commision) {
                          setFieldValue(finalType, 'credit')
                          setFieldValue(finalAmount, parseInt(amount) - parseInt(commision))
                        } else {
                          setFieldValue(finalType, 'debit')
                          setFieldValue(finalAmount, parseInt(commision) - parseInt(amount))
                        }
                      }

                      function handleSign(e) {
                        if (e.target.value === '=') {
                          setFieldValue(commision, values.transactions[index].commision1 || values.transactions[index].commision2 || 0)
                          setFieldValue(commision1, values.transactions[index].commision1 || values.transactions[index].commision2 || 0)
                          setFieldValue(commision2, values.transactions[index].commision1 || values.transactions[index].commision2 || 0)
                          if (values.transactions[index].amount) {
                            setFinalAmount(
                              values.transactions[index].amount,
                              values.transactions[index].commision1 || values.transactions[index].commision2 || 0
                            )
                          }
                        } else if (!values.transactions[index].commision1 || !values.transactions[index].commision2) {
                          console.log('')
                        } else {
                          setFieldValue(
                            commision,
                            operators[e.target.value](values.transactions[index].commision1, values.transactions[index].commision2)
                          )
                          setFinalAmount(
                            operators[e.target.value](values.transactions[index].commision1, values.transactions[index].commision2),
                            values.transactions[index].amount
                          )
                        }
                      }

                      function handleCommision1(e) {
                        if (!values.transactions[index].sign || !values.transactions[index].commision2) return
                        else if (values.transactions[index].sign !== '=') {
                          setFieldValue(
                            commision,
                            operators[values.transactions[index].sign](e.target.value, values.transactions[index].commision2)
                          )
                          setFinalAmount(
                            operators[values.transactions[index].sign](e.target.value, values.transactions[index].commision2),
                            values.transactions[index].amount
                          )
                        } else if (values.transactions[index].sign === '=') {
                          setFieldValue(commision, e.target.value)
                          setFieldValue(commision2, e.target.value)
                          setFinalAmount(values.transactions[index].amount, e.target.value)
                        }
                      }

                      function handleCommision2(e) {
                        if (!values.transactions[index].sign || !values.transactions[index].commision1) return
                        else if (values.transactions[index].sign !== '=') {
                          setFieldValue(
                            commision,
                            operators[values.transactions[index].sign](values.transactions[index].commision1, e.target.value)
                          )
                          setFinalAmount(
                            values.transactions[index].amount,
                            operators[values.transactions[index].sign](values.transactions[index].commision1, e.target.value)
                          )
                        } else if (values.transactions[index].sign === '=') {
                          setFieldValue(commision, e.target.value)
                          setFieldValue(commision1, e.target.value)
                          setFinalAmount(values.transactions[index].amount, e.target.value)
                        }
                      }
                      function handleAmount(e) {
                        if (values.transactions[index].commision) {
                          setFinalAmount(e.target.value, values.transactions[index].commision)
                        }
                      }

                      return (
                        <Grid container key={index} spacing={2} alignItems='basline'>
                          <Grid item lg={2} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Ac. No'
                              name={acNo}
                              value={p.acNo}
                              type='number'
                              required
                              helperText={touchedAcNo && errorAcNo ? errorAcNo : ''}
                              error={Boolean(touchedAcNo && errorAcNo)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={3} sm={12} md={12}>
                            <TextField
                              id='outlined-select-currency'
                              select
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Select Name '
                              name={userId}
                              value={p.userId}
                              required
                              helperText={touchedUserId && errorUserId ? errorUserId : ''}
                              error={Boolean(touchedUserId && errorUserId)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            >
                              {(users || []).map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item lg={4} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Description'
                              name={description}
                              value={p.description}
                              required
                              helperText={touchedDescription && errorDescription ? errorDescription : ''}
                              error={Boolean(touchedDescription && errorDescription)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={3} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Final Amount'
                              type='number'
                              name={finalAmount}
                              value={p.finalAmount || 0}
                              helperText={'Auttomatically Calculated'}
                              error={Boolean(touchedFinalAmout && errorFinalAmout)}
                              disabled
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={2} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Amout'
                              type='number'
                              name={amount}
                              value={p.amount || ''}
                              required
                              helperText={touchedAmount && errorAmount ? errorAmount : ''}
                              error={Boolean(touchedAmount && errorAmount)}
                              onChange={(e) => {
                                handleChange(e)
                                handleAmount(e)
                              }}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={1} sm={12} md={12}>
                            <TextField
                              id='outlined-select-currency'
                              select
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Type'
                              name={amountType}
                              value={p.amountType}
                              required
                              helperText='Amount type'
                              error={Boolean(touchedAmountType && errorAmountType)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            >
                              {[
                                { value: 'credit', name: 'Credit' },
                                { value: 'debit', name: 'Debit' }
                              ].map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item lg={2} sm={4} md={4}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Commision 1'
                              type='number'
                              name={commision1}
                              value={p.commision1 || ''}
                              required
                              helperText={touchedCommision1 && errorCommision1 ? errorCommision1 : ''}
                              error={Boolean(touchedCommision1 && errorCommision1)}
                              onChange={(e) => {
                                handleChange(e)
                                handleCommision1(e)
                              }}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={0.5} sm={2} md={2}>
                            <TextField
                              select
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label=''
                              name={sign}
                              value={p.sign}
                              required
                              helperText={touchedSign && errorSign ? errorSign : ''}
                              error={Boolean(touchedSign && errorSign)}
                              onChange={(e) => {
                                handleChange(e)
                                handleSign(e)
                              }}
                              onBlur={handleBlur}
                              size='small'
                            >
                              {[
                                { value: '+', name: '+' },
                                { value: '-', name: '-' },
                                { value: 'x', name: 'X' },
                                { value: '/', name: '/' },
                                { value: '=', name: '=' }
                              ].map((option) => (
                                <MenuItem key={option.value} value={option.value} style={{ fontWeight: 600 }}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item lg={2} sm={4} md={4}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Commision 2'
                              type='number'
                              name={commision2}
                              value={p.commision2 || ''}
                              required
                              helperText={touchedCommision2 && errorCommision2 ? errorCommision2 : ''}
                              error={Boolean(touchedCommision2 && errorCommision2)}
                              fast={false}
                              onChange={(e) => {
                                handleChange(e)
                                handleCommision2(e)
                              }}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={1} sm={12} md={12}>
                            <TextField
                              id='outlined-select-currency'
                              select
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Type'
                              name={commisionType}
                              value={p.commisionType}
                              required
                              helperText='Commision type'
                              error={Boolean(touchedCommisionType && errorCommisionType)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            >
                              {[
                                { value: 'credit', name: 'Credit' },
                                { value: 'debit', name: 'Debit' }
                              ].map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item lg={2.5} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Final Commision'
                              type='number'
                              name={commision}
                              value={p.commision || 0}
                              required
                              disabled
                              helperText={'Auttomatically Calculated'}
                              error={Boolean(touchedCommision && errorCommision)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={1} sm={12} md={12} style={{ cursor: 'pointer', marginTop: '0.8rem' }}>
                            <IconButton color='secondary'>
                              {index === values.transactions.length - 1 && (
                                <AddIcon size='small' onClick={() => push({ acNo: '', name: '' })} />
                              )}
                              {index !== 0 && <DeleteIcon size='small' onClick={() => remove(index)} />}
                            </IconButton>
                          </Grid>
                        </Grid>
                      )
                    })}
                    <Grid container item xs={12} justifyContent='flex-end'>
                      <Button type='submit' variant='contained' color='secondary'>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </FieldArray>
            </Form>
          )}
        />
      )}
    </Grid>
  )
}
