import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './reboot.css';
import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
