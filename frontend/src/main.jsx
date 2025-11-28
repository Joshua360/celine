import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import "./index.css" // <-- make sure this line exists
//import "react-quill-new/dist/quill.snow.css"
//import "react-quill/dist/quill.snow.css"


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
