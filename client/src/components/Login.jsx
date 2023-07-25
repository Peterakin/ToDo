import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:1602/api/login', {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json()
        if(data.user){
            localStorage.setItem('token', data.user)
            alert("Login Successful")
            window.location.href = "/app"
        }else{
            alert("Please check user name and password")
        }
    };

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={loginUser}>
                <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} className='input'/> <br />
                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className='input'/> <br />
                <input className="logbtn" type="submit" value="login"/><br />
                <a href="/register" className='link'>Dont have an account please register</a>
        </form>
    </div>
  )
}

export default Login