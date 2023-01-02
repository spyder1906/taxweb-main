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

  async function addSaleTransaction(data) {
    data.transactions = data.transactions.map((t) => {
      return { ...t, name: users.find((u) => u._id === t.userId).name, reference: users.find((u) => u._id === t.referenceId).name }
    })
    setLoading(true)
    try {
      await axios.post(`${apiURL}/api/saleTransactions/add`, data)
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
      <h2>Add Sale Transactions</h2>
      {loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            transactions: [{}]
          }}
          onSubmit={addSaleTransaction}
          render={({ values, touched, errors, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <FieldArray name='transactions'>
                {({ push, remove }) => (
                  <Grid>
                    {values.transactions.map((p, index) => {
                      const date = `transactions[${index}].date`
                      const touchedAcNo = getIn(touched, date)
                      const errorAcNo = getIn(errors, date)

                      const referenceId = `transactions[${index}].referenceId`
                      const touchedReferenceId = getIn(touched, referenceId)
                      const errorReferenceId = getIn(errors, referenceId)

                      const userId = `transactions[${index}].userId`
                      const touchedUserId = getIn(touched, userId)
                      const errorUserId = getIn(errors, userId)

                      const quantity = `transactions[${index}].quantity`
                      const touchedQuantity = getIn(touched, quantity)
                      const errorQuantity = getIn(errors, quantity)

                      const price = `transactions[${index}].price`
                      const touchedPrice = getIn(touched, price)
                      const errorPrice = getIn(errors, price)

                      const sign = `transactions[${index}].sign`
                      const touchedSign = getIn(touched, sign)
                      const errorSign = getIn(errors, sign)

                      const type = `transactions[${index}].type`
                      const touchedType = getIn(touched, type)
                      const errorType = getIn(errors, type)

                      const finalValue = `transactions[${index}].finalValue`
                      const touchedFinalValue = getIn(touched, finalValue)
                      const errorFinalValue = getIn(errors, finalValue)

                      function handleSign(e) {
                        if (e.target.value === '=') {
                          let v =
                            values.transactions[index].quantity ||
                            values.transactions[index].price ||
                            values.transactions[index].finalValue ||
                            0
                          setFieldValue(finalValue, v)
                          setFieldValue(quantity, v)
                          setFieldValue(price, v)
                        } else if (!values.transactions[index].quantity || !values.transactions[index].price) {
                          console.log('')
                        } else {
                          setFieldValue(
                            finalValue,
                            operators[e.target.value](values.transactions[index].quantity, values.transactions[index].price)
                          )
                        }
                      }

                      function handleQuantity(e) {
                        if (!values.transactions[index].sign || !values.transactions[index].price) return
                        else if (values.transactions[index].sign !== '=') {
                          setFieldValue(
                            finalValue,
                            operators[values.transactions[index].sign](e.target.value, values.transactions[index].price)
                          )
                        } else if (values.transactions[index].sign === '=') {
                          setFieldValue(finalValue, e.target.value)
                          setFieldValue(price, e.target.value)
                        }
                      }

                      function handlePrice(e) {
                        if (!values.transactions[index].sign || !values.transactions[index].quantity) return
                        else if (values.transactions[index].sign !== '=') {
                          setFieldValue(
                            finalValue,
                            operators[values.transactions[index].sign](values.transactions[index].quantity, e.target.value)
                          )
                        } else if (values.transactions[index].sign === '=') {
                          setFieldValue(finalValue, e.target.value)
                          setFieldValue(quantity, e.target.value)
                        }
                      }

                      return (
                        <Grid container key={index} spacing={2} alignItems='basline'>
                          <Grid item lg={2} sm={12} md={12} xs={8}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Date'
                              name={date}
                              value={p.date || new Date()}
                              type='date'
                              required
                              helperText={touchedAcNo && errorAcNo ? errorAcNo : ''}
                              error={Boolean(touchedAcNo && errorAcNo)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={3} sm={12} md={12} xs={6}>
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
                          <Grid item lg={2} sm={12} md={12} xs={6}>
                            <TextField
                              id='outlined-select-currency'
                              select
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Reference'
                              name={referenceId}
                              value={p.referenceId}
                              required
                              helperText={touchedReferenceId && errorReferenceId ? errorReferenceId : ''}
                              error={Boolean(touchedReferenceId && errorReferenceId)}
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
                          <Grid item lg={2} sm={12} md={12} xs={8}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Quantity'
                              type='number'
                              name={quantity}
                              value={p.quantity || ''}
                              required
                              helperText={touchedQuantity && errorQuantity ? errorQuantity : ''}
                              error={Boolean(touchedQuantity && errorQuantity)}
                              onChange={(e) => {
                                handleChange(e)
                                handleQuantity(e)
                              }}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={1} sm={12} md={12} xs={4}>
                            <TextField
                              id='outlined-select-currency'
                              select
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Type'
                              name={type}
                              value={p.type}
                              required
                              helperText={touchedType && errorType ? errorType : ''}
                              error={Boolean(touchedType && errorType)}
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
                              label='Price'
                              type='number'
                              name={price}
                              value={p.price || ''}
                              required
                              helperText={touchedPrice && errorPrice ? errorPrice : ''}
                              error={Boolean(touchedPrice && errorPrice)}
                              fast={false}
                              onChange={(e) => {
                                handleChange(e)
                                handlePrice(e)
                              }}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={3} sm={12} md={12}>
                            <TextField
                              fullWidth
                              margin='normal'
                              variant='outlined'
                              label='Final Value'
                              type='number'
                              name={finalValue}
                              value={p.finalValue || 0}
                              helperText={'Auttomatically Calculated'}
                              error={Boolean(touchedFinalValue && errorFinalValue)}
                              disabled
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size='small'
                            />
                          </Grid>
                          <Grid item lg={1} sm={12} md={12} style={{ cursor: 'pointer', marginTop: '0.8rem' }}>
                            <IconButton color='secondary'>
                              {index === values.transactions.length - 1 && (
                                <AddIcon size='small' onClick={() => push({ date: '', name: '' })} />
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
