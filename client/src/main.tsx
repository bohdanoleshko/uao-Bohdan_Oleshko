import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
