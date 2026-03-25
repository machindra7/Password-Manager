

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 

import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      region: "us-east-1",
      userPoolId: "us-east-1_cs9G6OSca",
      userPoolClientId: "3iqlm8kfho6j3afl04fa2i8fu4"
    }
  }
});


console.log("ENV:", import.meta.env);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
      <App />
  </React.StrictMode>
)
