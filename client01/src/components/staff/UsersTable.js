import * as React from 'react'
import styled from 'styled-components'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch'

const UsersTableWrapper = styled('div')`
  @media (max-width: 575px) {
    .table-detail {
      min-width: 250px;
    }
  }
`

// eslint-disable-next-line react/prop-types
export default function TransactionTable({ taxUsers = [] }) {
  return (
    <UsersTableWrapper>
      <TableContainer component={Paper} style={{ textAlign: 'center' }}>
        <Table sx={{ minWidth: 650 }} size='small' className='table-detail'>
          <TableHead>
            <TableRow>
              <TableCell align='center' style={{ verticalAlign: 'top' }}>
                Name
              </TableCell>
              <TableCell align='center' style={{ verticalAlign: 'top' }}>
                Created At
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(taxUsers || []).map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center' style={{ verticalAlign: 'top' }} component='th' scope='row'>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      textAlign: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {row.name}
                    &nbsp;
                    <Link to={`/users/view/${row._id}`}>
                      <LaunchIcon style={{ fontSize: '18px' }} />
                    </Link>
                  </div>
                </TableCell>
                <TableCell align='center' style={{ verticalAlign: 'top' }}>
                  {new Date(row.date).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </UsersTableWrapper>
  )
}
