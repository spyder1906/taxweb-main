import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import { Provider, useSelector } from 'react-redux'
import TransactionsList from './components/staff/TransactionsList'
import TransactionsSalesList from './components/staff/TransactionsSalesList'
import UsersList from './components/staff/UsersList'
import User from './components/staff/User'
import store from './redux/store'
import { Navigate } from 'react-router-dom'
import AdminRegister from './components/admin/Register'
import AdminLogin from './components/admin/Login'

const theme = createTheme({
  palette: {
    primary: {
      main: '#b92b27'
    },
    secondary: {
      main: '#5B84B1FF'
    }
  }
})

function App() {
  let user = useSelector((state) => state.user)
  let adminUser = useSelector((state) => state.adminUser)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={user || adminUser ? <Navigate to='/dashboard' /> : <Login />} />
        <Route exact path='/dashboard' element={user || adminUser ? <Dashboard /> : <Login />} />
        <Route exact path='/login' element={user || adminUser ? <Navigate to='/dashboard' /> : <Login />} />
        <Route exact path='/register' element={user || adminUser ? <Dashboard /> : <Register />} />
        <Route exact path='/transactions' element={user || adminUser ? <TransactionsList /> : <Login />} />
        <Route exact path='/transactions/sales' element={user || adminUser ? <TransactionsSalesList /> : <Login />} />
        <Route exact path='/users' element={user || adminUser ? <UsersList /> : <Login />} />
        <Route exact path='/users/view/:userId' element={user || adminUser ? <User /> : <Login />} />
        <Route exact path='/admin/login' element={<AdminLogin />} />
        <Route exact path='/admin/register' element={<AdminRegister />} />
        {/* <Route exact path='/login' element={user ? <Dashboard /> : <Login />} />
        <Route exact path='/login' element={user ? <Dashboard /> : <Login />} />
        <Route exact path='/login' element={user ? <Dashboard /> : <Login />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
)
