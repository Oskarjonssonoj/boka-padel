import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/ContextComponent'
import Page from '../../shared/pages/Page'
import './styles/login.scss'

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
                    <h1>Logga in</h1>
                    
                    <p className="error-msg">{error}</p>
                    <div className="input-fields">
                        <input 
                                type="text" 
                                autoFo  cus 
                                required 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Epost..."
                            /> 
                            
                            <input 
                                type="password" 
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Lösenord..."
                            /> 
                    </div>
                    
                    <div className="btn-container">
                        <div className="btns">
                            <button disabled={loading} id="sign-in">Logga in</button>
                            <Link to="/register"><button disabled={loading}>Registera dig</button></Link>
                        </div>
                        <p>Har du glömt bort ditt lösenord? Klicka <Link to="/reset-password">här</Link></p>
                    </div>
                </form>
            </div>
        </Page>
    )
}

export default Login