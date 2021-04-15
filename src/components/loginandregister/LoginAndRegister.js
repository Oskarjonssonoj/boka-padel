import React from 'react'
import Register from './register/Register'
import Login from './login/Login'

const LoginAndRegister = ({activated}) => {
    return (
        <div className="login-and-register-popup">

        <Login />

        <Register />
            
        </div>
    )
}

export default LoginAndRegister
