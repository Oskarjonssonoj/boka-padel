import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/ContextComponent'
import Page from '../../shared/pages/Page'

const Login = (props) => {

    // States
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Hooks
    const navigate = useHistory()
    const { login } = useAuth()

    // GENERAL FUNCTIONS

    // Handle the submitting of login
    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null);

        try {
            setLoading(true)    
            await login(email, password)
            navigate.push('/')
        } catch (e) {
            setError("Email or password are invalid")
            setLoading(false)
        }

    }

    return (
        <Page title="Logga in">
            <div className="login">
                <div className="login-container"> 
                    <form onSubmit={handleSubmit}>
                        
                        <h1>Log In</h1>
                        
                        <p className="error-msg">{error}</p>
                        <div className="input-fields">
                            <input 
                                    type="text" 
                                    autoFocus 
                                    required 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Email..."
                                /> 
                                
                                <input 
                                    type="password" 
                                    required 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Password..."
                                /> 
                        </div>
                        
                        <div className="btn-container">
                            <div className="btns">
                                <button disabled={loading} id="sign-in">Log in</button>
                                <Link to="/register"><button disabled={loading}>Register</button></Link>
                            </div>
                            <p>Forgot your password? Click <Link to="/reset-password">Here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </Page>
    )
}

export default Login