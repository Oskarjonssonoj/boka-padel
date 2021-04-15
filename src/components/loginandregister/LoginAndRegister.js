import React, { useState } from 'react'
import Register from './register/Register'
import Login from './login/Login'
import './styles/loginandregister.scss'
import Animate from 'react-smooth'

const LoginAndRegister = ({setLoginAndRegister}) => {

    const [login, setLogin] = useState(true)
    const [register, setRegister] = useState(false)

    const close = () => {
        setLoginAndRegister(false)
    }
    return (
        <div className="login-and-register-popup">
                {
                    login &&
                    <Animate to="1" from="0" attributeName="opacity" duration="300">
                        <div className="login-and-register-window" id="login">
                            <Animate to="1" from="0" attributeName="opacity" duration="1000">
                                <Login setRegister={setRegister} setLogin={setLogin} close={close}/>
                            </Animate>
                        </div>
                    </Animate>
                }
                {
                    register &&
                    <Animate to="1" from="0" attributeName="opacity" duration="300">
                        <div className="login-and-register-window" id="register">
                            <Animate to="1" from="0" attributeName="opacity" duration="1000">
                                <Register setRegister={setRegister} setLogin={setLogin} close={close}/>
                            </Animate>
                        </div>
                    </Animate>
                }
        </div>
    )
}

export default LoginAndRegister
