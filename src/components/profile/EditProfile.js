import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { AiOutlineGlobal } from "react-icons/ai";
import { HiLockClosed } from "react-icons/hi";
import './styles/editprofile.scss'
import { useAuth } from '../../contexts/ContextComponent';
import { db } from '../../firebase/firebase';
import useUser from '../../hooks/useUser'
import ButtonLoaderSmall from '../../shared/components/loading/ButtonLoaderSmall';
import Page from '../../shared/pages/Page'

const EditProfile = () => {
    const [updatedUser, setUpdatedUser] = useState()
    const [processing, setProcessing] = useState(false)

    const {currentUser} = useAuth()
    const {user} = useUser(currentUser.uid)
    const history = useHistory()

    useEffect(() => {
        setUpdatedUser(user)
    }, [user])

    const handleChange = (e) => {
		const { name, value } = e.target;
        setUpdatedUser({
            ...updatedUser,
            [name]: value
        })
    } 

    const handelCancel = () => {
        history.push("/profile")
    }

    const handleSavedProfile = async (e) =>{		
        setProcessing(true)
		try {
			await db.collection('users').doc(currentUser.uid).update(updatedUser);
            setProcessing(false)
            history.push("/profile")

		} catch (e) {
			setProcessing(false)
		}
	}

    return (
        <Page title="Redigera Profil">
            <div className="edit-profile-section">
                <div className="edit-profile-header">
                    <CgProfile />
                    <h2>Mina uppgifter</h2>
                </div>

                <div className="mandatory-header">
                    <h5>Obligatoriskt</h5>
                </div>

                <div className="mandatory-section">
                    <div className="left-field">
                        <div className="input-fields">
                            <div>
                                <label>Förnamn</label>
                                <AiOutlineGlobal />
                            </div>
                            <input 
                                type="text" 
                                required
                                value={updatedUser?.first_name}
                                onChange={handleChange}
                                name="first_name"
                                placeholder="Förnamn..."      
                            />
                        </div>
                        <div className="input-fields">
                            <div>
                                <label>Efternamn</label>
                                <HiLockClosed />
                            </div>
                            <input 
                                type="text" 
                                required
                                value={updatedUser?.last_name}
                                onChange={handleChange}
                                name="last_name"
                                placeholder="Efternamn..."      
                            />
                        </div>
                    </div>
                    <div className="right-field">
                        <div className="input-fields">
                            <div>
                                <label>E-post</label>
                                <HiLockClosed />
                            </div>
                            <input 
                                type="text" 
                                required
                                value={updatedUser?.email}
                                onChange={handleChange}
                                name="email"
                                placeholder="E-post..."      
                            />
                        </div>
                    </div>
                </div>

                <div className="optionally-header">
                    <h5>Valfritt</h5>
                </div>

                <div className="optionally-section">
                    <div className="left-field">
                        <div className="input-fields">
                            <div>
                                <label>Telefonnummer</label>
                                <HiLockClosed />
                            </div>
                            <input 
                                type="text" 
                                value={updatedUser?.phone}
                                onChange={handleChange}
                                name="phone"
                                placeholder="Telefonnummer..."    
                            />
                        </div>
                        <div className="input-fields">
                            <div>
                                <label>Adress</label>
                                <HiLockClosed />
                            </div>
                            <input 
                                type="text" 
                                value={updatedUser?.address}
                                onChange={handleChange}
                                name="address"    
                                placeholder="Adress..."  
                            />
                        </div>
                        <div className="input-fields">
                            <div>
                                <label>Postkod</label>
                                <HiLockClosed />
                            </div>
                            <input 
                                type="text" 
                                value={updatedUser?.postal_code}
                                onChange={handleChange}
                                name="postal_code"    
                                placeholder="Postkod..."  
                            />
                        </div>
                        <div className="input-fields">
                            <div>
                                <label>Födelsedag</label>
                                <HiLockClosed />
                            </div>
                            <input 
                                type="date" 
                                value={updatedUser?.date_of_birth}
                                onChange={handleChange}
                                name="date_of_birth"    
                                placeholder="Adress..."  
                            />
                        </div>
                        <div className="input-fields">
                            <div>
                                <label>Nationalitet</label>
                                <HiLockClosed />
                            </div>
                            <select 
                                type="date" 
                                value={updatedUser?.country}
                                onChange={handleChange}
                                name="country"     
                            >
                                <option value="" disabled selected>Välj Land...</option>
                                <option value="Sverige">Sverige</option>
                                <option value="Danmark">Danmark</option>
                                <option value="Norge">Norge</option>
                                <option value="Finland">Finland</option>
                            </select>
                        </div>
                    </div>
                    <div className="right-field">
                        <div className="input-fields">
                            <div>
                                <label>Kön</label>
                                <HiLockClosed />
                            </div>
                            <select 
                                type="date" 
                                value={updatedUser?.gender}
                                onChange={handleChange}
                                name="gender"      
                            >
                                <option value="" disabled selected>Välj Kön...</option>
                                <option value="Man">Man</option>
                                <option value="Kvinna">Kvinna</option>
                                <option value="Annat">Annat</option>
                            </select>
                        </div>
                        <div className="input-fields">
                            <div>
                                <label>Län</label>
                                <AiOutlineGlobal />
                            </div>
                            <select 
                                type="date" 
                                value={updatedUser?.county}
                                onChange={handleChange}
                                name="county"      
                            >
                                <option value="" disabled selected>Välj Län...</option>
                                <option value="Skåne">Skåne</option>
                                <option value="Blekinge">Blekinge</option>
                                <option value="Småland">Småland</option>
                                <option value="Halland">Halland</option>
                            </select>
                        </div>
                        <div className="input-fields">
                            <div>
                                <label>Språk</label>
                                <HiLockClosed />
                            </div>
                            <select 
                                type="date" 
                                value={updatedUser?.language}
                                onChange={handleChange}
                                name="language"      
                            >
                                <option value="" disabled selected>Välj Språk...</option>
                                <option value="Svenska">Svenska</option>
                                <option value="Danska">Danska</option>
                                <option value="Norska">Norska</option>
                                <option value="Finska">Finska</option>
                                <option value="Engelska">Engelska</option>
                            </select>
                        </div>

                        <div className="submit-buttons">
                            <button onClick={handleSavedProfile} id="save">
                                {
                                processing ?
                                <ButtonLoaderSmall /> 
                                :
                                "Spara"  
                                }
                            </button>
                            <button onClick={handelCancel} id="cancel">Avbryt</button>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default EditProfile
