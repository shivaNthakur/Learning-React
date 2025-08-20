import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './app/store'

createRoot(document.getElementById('root')).render(
  // our choice to want it in strict mode or not.
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <Provider store={store}>
    <App />
  </Provider>
)
