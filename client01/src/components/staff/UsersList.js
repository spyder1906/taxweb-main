import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Grid, Paper } from '@mui/material'
import AddAndEditUser from './AddAndEditUser'
import Modal from '../Modal'
import { useEffect } from 'react'
import axios from 'axios'
import UsersTable from './UsersTable'
import { useNavigate } from 'react-router-dom'
const apiURL = process.env.REACT_APP_API_URL

const UserListWrapper = styled('div')`
  @media (max-width: 575px) {
    .user-part {
      display: block;
      padding: 20px 0;
    }
    .users-list {
      padding: 5% !important;
    }
  }
`

export default function UsersList() {
  const [add, setAdd] = useState(false)
  const [taxUsers, setTaxUsers] = useState(null)
  let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }
  useEffect(() => {
    axios.get(`${apiURL}/api/taxUsers/get`).then(function (response) {
      setTaxUsers(response.data?.taxUsers || [])
    })
  }, [add])

  return (
    <UserListWrapper>
      <Grid style={{ padding: '5%', paddingLeft: '20%', paddingRight: '20%', textAlign: 'center' }} className='users-list'>
        <Paper elevation={4}>
          <Grid container justifyContent='center' alignItems='center' className='user-part'>
            <Grid item md={4} sm={4} lg={4} style={{ textAlign: 'center', fontFamily: 'system-ui' }}>
              <Button variant='contained' size='small' onClick={() => goToTheRoute('/dashboard')}>
                Go To Dashboard
              </Button>
            </Grid>
            <Grid item md={4} sm={4} lg={4} style={{ textAlign: 'center', fontFamily: 'system-ui' }}>
              <h2>Users List</h2>
            </Grid>
            <Grid item md={4} sm={4} lg={4}>
              <Button variant='contained' size='small' onClick={() => setAdd(true)}>
                Add User
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Grid>{taxUsers?.length && <UsersTable taxUsers={taxUsers} />}</Grid>
        <Modal
          isOpen={add}
          onClose={() => {
            setAdd(false)
          }}
        >
          <AddAndEditUser
            onClose={() => {
              setAdd(false)
            }}
          />
        </Modal>
      </Grid>
    </UserListWrapper>
  )
}
