import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api.js'

import './styles.css'
import './response.css'

toast.configure()

export default function Login() {
    
    const history = useHistory()

    localStorage.setItem('token', "");
    localStorage.setItem('user', "");
    localStorage.setItem('id', "");
    
    var [user, setUser] = useState('')
    var [email, setEmail] = useState('')
    var [password, setPassword] = useState('')
    async function Register(e) {
        e.preventDefault()

        const dados = {
            user,
            email,
            password,
        }

        try {
            const resposta = await api.post('/auth/register', dados)

            localStorage.setItem('token', resposta.data.token)
            localStorage.setItem('user', resposta.data.userConst.user)
            localStorage.setItem('id', resposta.data.userConst.userId)
            history.push('/activity')
            toast.dark('Welcome, save your daily reminders online :)', {position: "top-left", autoClose: 2200})
        } catch (err) {
            const message = err.response.data.error
            toast(message, {type: 'error'})
        }
    }

    var [user, setUser] = useState('')
    var [password, setPassword] = useState('')
    async function Login(e) {
        e.preventDefault()

        try {
            const response = await api.post('/auth/authenticate', { user, password })
            //console.log(response.data.token)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', user)
            localStorage.setItem('id', response.data.userConst._id)

            history.push('/activity')
            toast.dark('Welcome, save your daily reminders online :)', {position: "top-left", autoClose: 2200})
        } catch(err) {
            toast.error('Error while logging in', {position: "top-left"})
        }
    }

    async function load() {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
    
        await signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });
    
        await signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    }

    useEffect(() => {
        load()
    }, []) 


    return (
        <div className="principal">
            <div className="container" id="container">
                <div className="form-container sign-up-container">

                    <form onSubmit={Register} >
                        <h2>Create Account</h2>
                        <input 
                            type="text" 
                            placeholder="User" 
                            value={user}
                            onChange={e => setUser(e.target.value)}
                            required />

                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required />

                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            minLength="6"
                            required />
                            <small id="passwordHelpBlock" className="form-text text-muted">
                            Your password must be at least 6 characters.
                            </small>

                        <button type="submit">Sign up</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">

                    <form onSubmit={Login}>
                        <h1>Sign in</h1>
                        <input 
                            type="text" 
                            placeholder="User" 
                            value={user}
                            onChange={e => setUser(e.target.value)}
                            required />

                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required />

                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                To stay connected, login and update your activities!
                            </p>
                            <button className="ghost" id="signIn">Sign in</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register and plan your activities to stay in control of everything!</p>
                            <button className="ghost" id="signUp">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
