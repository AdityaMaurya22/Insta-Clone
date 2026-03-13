import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'


const register = () => {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {handleRegister, loading} = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <main>
        <h1>Lodaing...</h1>
      </main>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()

    handleRegister(username, email, password)
      .then(res => {
        console.log(res)
        navigate("/")
      })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

          <input
            onInput={(e) => { setEmail(e.target.value) }}
            type="email"
            name="email"
            id=""
            placeholder='Enter email' />

          <input
            onInput={(e) => { setUsername(e.target.value) }}
            type="text"
            name="username"
            placeholder='Enter username' />

          <input
            onInput={(e) => { setPassword(e.target.value) }}
            type="password"
            name="password"
            id=""
            placeholder='Enter password' />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link className="toggleAuthForm" to='/login'>Login</Link></p>
      </div>
    </main>
  )
}

export default register
