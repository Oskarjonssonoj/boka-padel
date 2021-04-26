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
    const [userHover, setUserHover] = useState({})

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

    const hoverInformation = (key, condition) => {
        setUserHover(prevState => ({...prevState, [key]: condition}))
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
                            <div className="input-heading">
                                <label>Förnamn</label>
                                <AiOutlineGlobal 
                                    onMouseEnter={() => hoverInformation("first_name", true)} 
                                    onMouseLeave={() => hoverInformation("first_name", false)}
                                />
                                {
                                    userHover.first_name &&
                                    <div className="hover-info" id="first_name">
                                        <p>Offentlig</p>
                                        <div className="arrow"/>
                                    </div>
                                }
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
                            <div className="input-heading">
                                <label>Efternamn</label>
                                <HiLockClosed 
                                    onMouseEnter={() => hoverInformation("last_name", true)} 
                                    onMouseLeave={() => hoverInformation("last_name", false)}
                                />
                                {
                                    userHover.last_name &&
                                    <div className="hover-info" id="last_name">
                                        <p>Visas bara för mig</p>
                                        <div className="arrow"/>
                                    </div>
                                }
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
                            <div className="input-heading">
                                <label>E-post</label>
                                <HiLockClosed 
                                    onMouseEnter={() => hoverInformation("email", true)} 
                                    onMouseLeave={() => hoverInformation("email", false)}
                                />
                                {
                                    userHover.email &&
                                    <div className="hover-info" id="email">
                                        <p>Visas bara för mig</p>
                                        <div className="arrow"/>
                                    </div>
                                }
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
                            <div className="input-heading">
                                <label>Telefonnummer</label>
                                <HiLockClosed 
                                onMouseEnter={() => hoverInformation("phone", true)} 
                                onMouseLeave={() => hoverInformation("phone", false)}
                                />
                                {
                                    userHover.phone &&
                                    <div className="hover-info" id="phone">
                                        <p>Visas bara för mig</p>
                                        <div className="arrow"/>
                                    </div>
                                }
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
                            <div className="input-heading">
                                <label>Adress</label>
                                <HiLockClosed 
                                onMouseEnter={() => hoverInformation("address", true)} 
                                onMouseLeave={() => hoverInformation("address", false)}
                                />
                                {
                                    userHover.address &&
                                    <div className="hover-info" id="address">
                                        <p>Visas bara för mig</p>
                                        <div className="arrow"/>
                                    </div>
                                }
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
                            <div className="input-heading">
                                <label>Postkod</label>
                                <HiLockClosed 
                                onMouseEnter={() => hoverInformation("postal_code", true)} 
                                onMouseLeave={() => hoverInformation("postal_code", false)}
                                />
                                {
                                    userHover.postal_code &&
                                    <div className="hover-info" id="postal_code">
                                        <p>Visas bara för mig</p>
                                        <div className="arrow"/>
                                    </div>
                                }
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
                            <div className="input-heading">
                                <label>Födelsedag</label>
                                <HiLockClosed 
                                onMouseEnter={() => hoverInformation("birtday", true)} 
                                onMouseLeave={() => hoverInformation("birtday", false)}
                                />
                                {
                                    userHover.birtday &&
                                    <div className="hover-info" id="birthday">
                                        <p>Visas bara för mig</p>
                                        <div className="arrow"/>
                                    </div>
                                }
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
                            <div className="input-heading">
                                <label>Nationalitet</label>
                                <HiLockClosed 
                                onMouseEnter={() => hoverInformation("nationality", true)} 
                                onMouseLeave={() => hoverInformation("nationality", false)}
                                />
                                {
                                    userHover.nationality &&
                                    <div className="hover-info" id="nationality">
                                        <p>Visas bara för mig</p>
                                        <div className="arrow"/>
                                    </div>
                                }
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
                            <div className="input-heading">
                                <label>Kön</label>
                                <HiLockClosed 
                                onMouseEnter={() => hoverInformation("gender", true)} 
                                onMouseLeave={() => hoverInformation("gender", false)}
                                />
                                {
                                    userHover.gender &&
                                    <div className="hover-info" id="gender">
                                        <p>Visas bara för mig</p>
                                        <div className="arrow"/>
                                    </div>
                                }
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
                            <div className="input-heading">
                                <label>Län</label>
                                <AiOutlineGlobal 
                                onMouseEnter={() => hoverInformation("county", true)} 
                                onMouseLeave={() => hoverInformation("county", false)}
                                />
                                {
                                    userHover.county &&
                                    <div className="hover-info" id="county">
                                        <p>Offentlig</p>
                                        <div className="arrow"/>
                                    </div>
                                }
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
                            <div className="input-heading">
                                <label>Språk</label>
                                <HiLockClosed 
                                onMouseEnter={() => hoverInformation("language", true)} 
                                onMouseLeave={() => hoverInformation("language", false)}
                                />
                                {
                                    userHover.language &&
                                    <div className="hover-info" id="language">
                                        <p>Visas bara för mig</p>
                                        <div className="arrow"/>
                                    </div>
                                }
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
