import React from 'react'
import ReactDOM from 'react-dom/client'

import GlobalStyles from './styles/globalStyles'

import { ToastContainer } from 'react-toastify'
import Routes from './routes'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <Routes />
    <ToastContainer autoClose={2000} theme='dark'/>
    <GlobalStyles />
  </>
)
