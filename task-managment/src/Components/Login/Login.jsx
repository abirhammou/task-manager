import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { AtSign, Eye } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', { email, password });
    
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log('Full Server Response:', result);
                if (result.data.success) {
                    login(result.data.user); // Store user object in context
                    toast.success('Login successful');
                    navigate('/tasks');
                } else {
                    toast.error(result.data.message || 'Login failed');
                }
            })
            .catch(err => {
                toast.error('Error:', err);
                alert('Something went wrong!');
            });
    };
    
    

    return (
        <div className='container'>
            <form className='form' onSubmit={handleSubmit}>
                <p className='form-title'>Login to your account</p>
                <div className='input-container'>
                    <input
                        placeholder='Enter email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span><AtSign /></span>
                </div>

                <div className='input-container'>
                    <input
                        placeholder='Enter password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span><Eye /></span>
                </div>

                <button className='submit' type='submit'>Login</button>
                <p className='signup-link'>No account? <Link to="/signup">Sign up</Link></p>
            </form>
        </div>
    );
}

export default Login;
