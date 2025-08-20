import Login from './components/Login';
import Profile from './components/Profile';

import UserContextProvider from './context/UserContextProvider';


import './App.css';

function App() {
  
  return (
    
     <UserContextProvider>
      <Login/>
      <Profile />
     </UserContextProvider>


// Could I write this instead of earlier version USeContextProvider(<Login/>,<Profile />)
  )
}


export default App
