import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../../contexts/ContextComponent'
import Page from '../../../shared/pages/Page'
import './styles/login.scss'
import { AiFillCloseCircle } from "react-icons/ai";
import Register from '../register/Register'
import ButtonLoaderSmall from '../../../shared/components/loading/ButtonLoaderSmall'

const Login = ({setRegister, setLogin, close}) => {

    // States
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Hooks
    const navigate = useHistory()
    const { login } = useAuth()

    // GENERAL FUNCTIONS
    const toggleRegister = () => {
        setLogin(false)
        setRegister(true)
    }

    // Handle the submitting of login
    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null);

        try {
            setLoading(true)    
            await login(email, password)
            close()
            navigate.push('/profile')
        } catch (e) {
            setError("Email or password are invalid")
            setLoading(false)
        }

    }

    return (
        <Page title="Logga in">
            <div className="login"> 
                <form onSubmit={handleSubmit}>
                    <div className="header">
                        <h5>Logga in</h5>
                        <AiFillCloseCircle onClick={close}/>
                    </div>
                    
                    <div className="body">
                        <p className="error-msg">{error}</p>
                        <div className="input-fields">
                            <label>Epost</label>
                            <input 
                                    type="text" 
                                    autoFo  cus 
                                    required 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Epost..."
                                /> 

                                <label>Lösenord</label>
                                <input 
                                    type="password" 
                                    required 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Lösenord..."
                                /> 
                        </div>
                    
                        <div className="btn-container" id="login-btn-container">
                            <div className="btns" id="login-btns">
                                <div>
                                    <button disabled={loading} id="sign-in">
                                        {
                                            loading ?
                                            <ButtonLoaderSmall />
                                            :
                                            "Logga in"
                                        }
                                    </button>
                                    <button disabled={loading} onClick={toggleRegister}>Registera dig</button>
                                </div>
                                <p>Har du glömt bort ditt lösenord? Klicka <span onClick={toggleRegister}>här</span></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Page>
    )
}

export default Login