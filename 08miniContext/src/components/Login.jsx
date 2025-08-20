{/*import React , {useState, useContext} from 'react'

import UserContext from '../context/userContext';

function Login() {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {setUser} = useContext(UserContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({username,password});
    }

  return (
    <div>
        <h1>Login</h1>
        <input type="text" 
        value={username}
        placeholder='username'
        onChange={(e) => setUsername(e.target.value)}
         />

         {" "}

        <input type="text" 
        value={password}
        placeholder='password'
        onChange={(e) => { setPassword(e.target.value) }}
         />

        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login*/}





import React , {useState, useContext} from 'react'
import UserContext from '../context/userContext';

function Login() {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {setUser} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username.trim() === '' || password.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }
        setUser({username, password});
    }

    return (
        <div>
            <h1>Login</h1>

            <input 
                type="text" 
                value={username}
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
            />
            {" "}

            <input 
                type="password" 
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login

