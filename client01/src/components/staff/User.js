import React, { useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { useEffect } from 'react'
import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL
import { useParams } from 'react-router-dom'
import Loader from '../Loader'
import SalesTable from './SalesTable'

export default function UsersList() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  // let navigate = useNavigate()

  // function goToTheRoute(route) {
  //   navigate(route)
  // }
  let { userId } = useParams()
  useEffect(() => {
    axios.get(`${apiURL}/api/taxUsers/get?userId=${userId}`).then(function (response) {
      setUser(response.data?.user || {})
      setTransactions([...(response.data?.transactions || []), ...(response.data?.saleTransactions || [])])
      setLoading(false)
    })
  }, [])
  return (
    <Grid style={{ marginLeft: '15%', marginRight: '15%' }}>
      {!loading ? (
        <Paper elevation={4} style={{ padding: '1%' }}>
          <Grid style={{ textAlign: 'center' }}>
            <div style={{ margin: '1rem' }}>
              <b>User: {user.name}</b>
            </div>
          </Grid>
          <Grid style={{}}>
            <Grid style={{ marginRight: '2%', marginLeft: '2%', border: '2px solid #b92b27' }}>
              <Grid>
                <SalesTable salesTransactions={transactions} userPage />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Loader />
      )}
    </Grid>
  )
}
