import React from 'react'
import UserContext from "./userContext";



//why we firing callback not declaring function.

const UserContextProvider = ({children}) => { 
    const [user,setUser] =React.useState(null); // whatb if we use it inside return and what if we dont call it here .
  return (
    
    <UserContext.Provider value = {{user,setUser}}> 
    {/* // Value to be provided to children // Why we providing setUser. */}
    {children}
    </UserContext.Provider>

  )
}

export default UserContextProvider