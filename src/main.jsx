const awsConfig = {
  region: import.meta.env.VITE_AWS_REGION,
  userPoolId: import.meta.env.VITE_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_CLIENT_ID
};
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
      <App />
  </React.StrictMode>
)
