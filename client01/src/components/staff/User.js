import React, { useState } from 'react'
import styled from 'styled-components'
import { Grid, Paper } from '@mui/material'
import { useEffect } from 'react'
import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL
import { useParams } from 'react-router-dom'
import Loader from '../Loader'
import SalesTable from './SalesTable'

const UserWrapper = styled('div')`
  @media (max-width: 575px) {
    .user-info {
      margin: 4% !important;
    }
    .mb-paper {
      padding: 3% !important;
    }
    .mb-size {
      margin: 0 !important;
    }
  }
`

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
    <UserWrapper>
      <Grid style={{ marginLeft: '15%', marginRight: '15%' }} className='user-info'>
        {!loading ? (
          <Paper elevation={4} style={{ padding: '1%' }} className='mb-paper'>
            <Grid style={{ textAlign: 'center' }}>
              <div style={{ margin: '1rem' }}>
                <b>User: {user.name}</b>
              </div>
            </Grid>
            <Grid style={{}}>
              <Grid style={{ marginRight: '2%', marginLeft: '2%', border: '2px solid #b92b27' }} className='mb-size'>
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
    </UserWrapper>
  )
}
