import React from 'react'
import LoginButton from './Login'

const Home = () => {
  return (
    <div>
        <h1>ToDo App</h1>
        <img src="src/assets/images/istockphoto-1271863211-170667a.webp" alt="" />
        <h2>Start Keeping Track of your Task</h2>
        <div>
          <button className="logbtn"><a href="/register">Register</a></button>
          <button className="logbtn"><a href="/login">Login</a></button>
        </div>
    </div>
  )
}

export default Home