import React, { useState } from 'react'
import './styles/register.scss'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../../contexts/ContextComponent'
import Page from '../../../shared/pages/Page'
import { AiFillCloseCircle } from "react-icons/ai";

const Register = ({setRegister, setLogin, close}) => {

  // States
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Hooks
  const history = useHistory()
  const { signup } = useAuth()

  // GENERAL FUNCTIONS
  const toggleLogin = () => {
    setLogin(true)
    setRegister(false)
}

  // Handle the submitting of login
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
        return setError("Lösenordet matchar inte")
    }

    setError(null);

    try {
        setLoading(true)
        await signup(email, password, firstName, lastName)
        history.push('/profile')  
    } catch (e) {
        setError(e.message)
        setLoading(false)
    }

}

  return (
      <Page title="Registrera">
          <div className="login"> 
              <form onSubmit={handleSubmit}>
                <div className="header">
                    <h5>Logga in</h5>
                    <AiFillCloseCircle onClick={close}/>
                </div>
                  
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
                            type="text" 
                            required 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            placeholder="Förnamn..."
                        />

                        <input 
                            type="text" 
                            required 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            placeholder="Efternamn..."
                        />
                         
                        <input 
                            type="password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Lösenord..."
                        /> 

                        <input 
                            type="password" 
                            required 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Bekräfta lösenord..." 
                        /> 
                    </div>
                  
                    <div className="btn-container">
                      <div className="btns">
                          <button disabled={loading} id="sign-in">Registrera</button>
                      </div>
                      <p>Har du redan ett konto? Klicka <span onClick={toggleLogin}>här</span></p>
                  </div>
              </form>
          </div>
      </Page>
  )
}

export default Register
