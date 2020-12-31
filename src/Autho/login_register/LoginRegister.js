import { useState, useEffect } from 'react';
import { login } from '../Repository';
import {TextField } from '@material-ui/core';
import Button from '../../Inputs/Button'

import './loginRegister.css'


function LoginLogout(props) {

    const [loginBox, setLoginBox] = useState('Login')


    const handleSuccessfulAuth = (data) => {
        props.handleLogin(data);
        props.history.push("/home");
      }

    useEffect(() => {
        if(props.isLoggedIn) {
            props.history.push("/home")
        }
    }, [props.isLoggedIn])

    return (
        <div>
            <h1 className='login-title'>Pets</h1>
            <div className="login-register-box">
                <div className="tabs">
                    <p 
                        className={loginBox === 'Login' ? 'active' : 'inactive'}
                        onClick={() => setLoginBox('Login')} >Login</p>
                    <p 
                        className={loginBox === 'Register' ? 'active' : 'inactive'}
                        onClick={() => setLoginBox('Register')}>Register</p>
                </div>
                <div className="login-register-box-main">
                    {loginBox === 'Login' ? 
                        <Login handleSuccessfulAuth={handleSuccessfulAuth} /> 
                        : 
                        <Register />}
                </div>
            </div>
        </div>
    )
}
export default LoginLogout;


function Login(props) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [loggingIn, setLoggingIn] = useState('Login')

    const submitLogin = () => {
        const lgnMsg = document.getElementById('login-message');
        logginginMessage()
        if (loginData.email === '') {
            removeLogginginMessage()
            lgnMsg.innerHTML = 'You forgot to type in your email'
          } else if (loginData.password === '') {
            removeLogginginMessage()
            lgnMsg.innerHTML = 'You forgot to type in your password'
          } else if (!loginData.email.match( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            removeLogginginMessage()
            lgnMsg.innerHTML = 'You didnt enter a valid email'
        } else {
            login(loginData)
            .then(res => {
                props.handleSuccessfulAuth(res)
            })
            .catch(err => { 
                removeLogginginMessage() 
                lgnMsg.innerHTML = err
            })
          }
    }

    const handleChange = (e) => {
        const {id, value} = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const logginginMessage = () => {
        setLoggingIn('Loging In')
      }
    const removeLogginginMessage = () => {
        setLoggingIn('Login')
      }
  
    return (
        <div className="login-box">
            <h3>Login</h3>
            <div className="login-box-inner">
                <TextField 
                    fullWidth={true}
                    required={true}
                    id="email" 
                    label="email"
                    name="email"
                    value={loginData.email}
                    onChange={ handleChange }
                    />
                <TextField 
                    fullWidth={true}
                    required={true}
                    id="password" 
                    label="password"
                    name="password"
                    value={loginData.password}
                    onChange={ handleChange }
                    />
                </div>
            <Button
                onClick={() => submitLogin()} 
                name={loggingIn}/>
            <p id="login-message"></p>
        </div>
    )

}

function Register(props) {

    const register = () => {
        console.log('register')
    }

    return (
        <div>
            <h3 >Resgister</h3>
            <Button name="Register"/>
        </div>
    )
}