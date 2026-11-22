import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Ensure light mode is strictly enforced across all pages
if (typeof window !== 'undefined') {
  document.documentElement.classList.remove('dark');
  localStorage.removeItem('al-hikmah-theme');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
