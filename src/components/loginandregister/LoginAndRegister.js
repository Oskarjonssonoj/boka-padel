import React, { useState } from 'react'
import Register from './register/Register'
import Login from './login/Login'
import './styles/loginandregister.scss'

const LoginAndRegister = ({setLoginAndRegister}) => {

    const [login, setLogin] = useState(true)
    const [register, setRegister] = useState(false)

    const close = () => {
        setLoginAndRegister(false)
    }
    return (
        <div className="login-and-register-popup">
            <div className="login-and-register-window">
                {
                    login &&
                    <Login setRegister={setRegister} setLogin={setLogin} close={close}/>
                }
                {
                    register &&
                    <Register setRegister={setRegister} setLogin={setLogin} close={close}/>
                }
            </div>
        </div>
    )
}

export default LoginAndRegister
