import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './pages/Login/src/index.css'

import { GoogleOAuthProvider } from '@react-oauth/google'

// 🔁 Replace with your real Google Client ID
const GOOGLE_CLIENT_ID = "1057197802246-l9co82fm7hrnih3rb2h52m8gj96mlacj.apps.googleusercontent.com"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
)