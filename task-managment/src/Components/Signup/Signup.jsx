import React, { useState } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import { User, AtSign, Eye } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Signup() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', { name, email, password }); 
        axios.post('http://localhost:3001/register', { name, email, password })
        .then(result => 
            {toast.success('Signup successful! Welcome, ' + result.data.name)
            navigate('/')
        })
        .catch(err => 
            toast.error('Error:', err));
    }
    

  return (
    <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
            <p className='form-title'>Sign up</p>
            <div className='input-container'>
                <input placeholder='Enter name' type='name' 
                name='name'
                onChange={(e) => setName(e.target.value)}
                />
                <span><User /></span>
            </div>

            <div className='input-container'>
                <input placeholder='Enter email' type='email'
                name='email' 
                onChange={(e) => setEmail(e.target.value)}
                />
                <span><AtSign /></span>
            </div>

            <div className='input-container'>
                <input placeholder='Enter password' type='password'
                name='password' 
                onChange={(e) => setPassword(e.target.value)}
                />
                <span><Eye /></span>
            </div>

            <button className='submit' type='submit'>Login</button>
            <p className='signup-link'>Have an account?
                <Link to="/">Login</Link>
            </p>
        </form>
    </div>
  )
}

export default Signup