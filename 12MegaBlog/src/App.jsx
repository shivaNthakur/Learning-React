import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import authService from "./appwrite/auth";
import {login , logout} from "./store/authSlice";
import {Footer, Header} from './components'
import {Outlet} from 'react-router-dom';
import './App.css';

function App() {

  // We create loading since our backend service is different continent , to do conditional rendiring as it take some data to come from it .
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // To ask service if you are login or not
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login(userData));
        
      } else {
        dispatch(log)
      }
    })
    .finally(() => setLoading(false)) // finally always run
  }, []) 

  // Conditional Rendering
  return !loading ? (
    <div className='flex flex-wrap content-between min-h-screen bg-gray-400'>
      <div className='block w-full'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

  
  
}

export default App
