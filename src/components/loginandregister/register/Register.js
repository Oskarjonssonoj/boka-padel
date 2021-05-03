import React, { useState } from 'react'
import './styles/register.scss'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../../contexts/ContextComponent'
import Page from '../../../shared/pages/Page'
import { AiFillCloseCircle } from "react-icons/ai";
import ButtonLoaderSmall from '../../../shared/components/loading/ButtonLoaderSmall'

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
        close()
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
                    <h5>Registrera</h5>
                    <AiFillCloseCircle onClick={close}/>
                </div>
                  
                <div className="body">
                    <p className="error-msg">{error}</p>
                        <div className="input-fields">
                            <label>Epost</label>
                            <input 
                                type="text" 
                                autoFocus 
                                required 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Epost..."
                            />

                            <label>Förnamn</label>
                            <input 
                                type="text" 
                                required 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                placeholder="Förnamn..."
                            />

                            <label>Efternamn</label>
                            <input 
                                type="text" 
                                required 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                placeholder="Efternamn..."
                            />
                            
                            <label>Lösenord</label>
                            <input 
                                type="password" 
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Lösenord..."
                            /> 

                            <label>Bekräfta Lösenord</label>
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
                            <p>Har du redan ett konto? Klicka <span onClick={toggleLogin}>här</span></p>
                            <button disabled={loading} id="sign-in">
                                {
                                    loading ?
                                    <ButtonLoaderSmall />

                                    :

                                    "Registrera"
                                }
                            </button>
                        </div>
                    </div>
                </div>  
              </form>
          </div>
      </Page>
  )
}

export default Register
