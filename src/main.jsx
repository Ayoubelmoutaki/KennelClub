import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function bootstrap(){
  const rootEl = document.getElementById('root')
  if(!rootEl){
    console.error('Root element #root not found')
    return
  }
  console.log('[DogHotel] mounting app...')
  createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

bootstrap()
