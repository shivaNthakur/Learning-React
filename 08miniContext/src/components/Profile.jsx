import React, {useContext} from 'react'
import UserContext from '../context/userContext';

function Profile() {
    const {user} = useContext(UserContext)

    if(!user) return <div>please Login</div>
    
  return (
    
    <div>Welcome {user.username}</div> // write it in such a way if empty display some message.
  )
}

export default Profile



// Fix it if someone enter null or left it vacant and submit it showing Welcome ______(empty) // Display an alert to enter details

{/*import React, { useContext, useEffect } from 'react'
import UserContext from '../context/userContext';

function Profile() {
    const { user } = useContext(UserContext)

    // Show a message if the user is not logged in
    if (!user) return <div>Please Login</div>

    // Check if username or password is empty or contains only spaces
    if (!user.username.trim() || !user.password.trim()) {
        alert('Incomplete details provided. Please login again with valid information.');
        return <div>Please enter valid login details.</div>
    }

    return (
        <div>Welcome {user.username}</div>
    )
}

export default Profile*/}