import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:1602/api/register', {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        const data = await response.json()
        if(data.status === 'ok'){
            navigate('/login')
        }
        
        console.log(data)
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} className='input'/> <br />
                <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} className='input'/> <br />
                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className='input'/> <br />
                <input type="submit" className="logbtn" value="Register"/><br />
                <a href="/login" className='link' >Already have an account</a>
            </form>
        </div>
    );
};

export default Register;
