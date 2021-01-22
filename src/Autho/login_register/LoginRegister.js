import { useState, useEffect } from 'react';
import { login, register } from '../Repository';
import {TextField } from '@material-ui/core';
import Button from '../../Inputs/Button';
import { makeStyles } from '@material-ui/core/styles';

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
    }, [props.isLoggedIn, props.history])

    return (
        <div>
            <div className="mobile-login-title">
                <p>f<span>u</span>rb<span>u</span>d</p>
            </div>
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
                    type="password"
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

    const [registerData, setRegisterData] = useState({
        fname: '',
        lname: '',
        email: '',
        password_reg: '',
        password_match: ''
    })
    const [registering, setRegister] = useState('Register')

    const submitLogin = () => {
        const regMsg = document.getElementById('registration-message');
        registerMessage()
        if (registerData.email === '') {
            removeRegisterMessage()
            regMsg.innerHTML = 'You forgot to type in an email'
        } else if (registerData.password_reg === '') {
            removeRegisterMessage()
            regMsg.innerHTML = 'You forgot to type in your password'
        } else if (registerData.password_reg !== registerData.password_match) {
            removeRegisterMessage()
            regMsg.innerHTML = 'You passwords do not match'
        } else if (!registerData.email.match( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            removeRegisterMessage()
            regMsg.innerHTML = 'You didnt enter a valid email'
        } else {
            register(registerData)
                .then(res => {
                    regMsg.innerHTML = 'You are now Registered!'
                    setTimeout(() => window.location.reload(), 2000)
                })
                .catch(err => { 
                    removeRegisterMessage() 
                    regMsg.innerHTML = 'That Email is already registered'
                })
          }
    }

    const handleChange = (e) => {
        const {id, value} = e.target;
        setRegisterData(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const registerMessage = () => {
        setRegister('Registering')
      }
    const removeRegisterMessage = () => {
        setRegister('Register')
      }


    const useStyles = makeStyles((theme) => ({
        notmatch: {
            '& .MuiInputBase-input': {
                background: 'rgba(255, 0, 0, 0.4)'
            },
          },
        match: {
            '& .MuiInputBase-input': {
                background: 'rgba(76, 175, 80, 0.4)'
            },
          },
        }));
    const classes = useStyles();

    return (
        <div className="login-box">
            <h3>Register</h3>
            <div className="login-box-inner">
                <div style={{display: 'flex'}}>
                    <TextField 
                    style={{ width: '48%', marginRight: '4%' }}
                        fullWidth={true}
                        required={true}
                        id="fname" 
                        label="first name"
                        name="first name"
                        value={registerData.fname}
                        onChange={ handleChange }
                        />
                    <TextField 
                        style={{ width: '48%' }}
                        fullWidth={true}
                        required={true}
                        id="lname" 
                        label="last name"
                        name="last name"
                        value={registerData.lname}
                        onChange={ handleChange }
                        />
                </div>
                <TextField 
                    fullWidth={true}
                    required={true}
                    id="email" 
                    label="email"
                    name="email"
                    value={registerData.email}
                    onChange={ handleChange }
                    />
                <TextField 
                    fullWidth={true}
                    required={true}
                    id="password_reg" 
                    label="password"
                    name="password_reg"
                    type="password"
                    value={registerData.password}
                    onChange={ handleChange }
                    />
                <TextField 
                    className={
                        registerData.password_match === '' ? 
                        '' : 
                        (registerData.password_match === registerData.password_reg) ?
                            classes.match : classes.notmatch 

                    }
                    fullWidth={true}
                    required={true}
                    id="password_match" 
                    label="confirm password"
                    name="confirm password"
                    type="password"
                    value={registerData.password_match}
                    onChange={ handleChange }
                    />
                </div>
            <Button
                onClick={() => submitLogin()} 
                name={registering}/>
            <p id="registration-message"></p>
        </div>
    )
}