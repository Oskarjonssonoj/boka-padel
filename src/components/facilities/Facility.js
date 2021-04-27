import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFacility from '../../hooks/useFacility'
import GoogleMaps from '../../shared/components/google/GoogleMaps'
import Loading from '../../shared/components/loading/Loading'
import Page from '../../shared/pages/Page'
import FacilityInfo from './FacilityInfo'
import './styles/facility.scss'
import { db } from '../../firebase/firebase';
import useUser from '../../hooks/useUser'
import { useAuth } from '../../contexts/ContextComponent';
import { AiOutlineHeart } from "react-icons/ai";
import Calendar from './Calendar'

const Facility = ({setLoginAndRegister}) => {
    const { id } = useParams()
    const { facility, loading } = useFacility(id)
    const {currentUser} = useAuth()
    const {user} = useUser(currentUser?.uid)

    useEffect(() => {
        setFavorite(user?.favorites?.some(e => e.id === facility?.id))
    }, [user, facility])

    const [favorite, setFavorite] = useState(false)

    const handleFavorite = async (e) =>{
        let copy = ({ ...user });
        console.log("tja", copy)

        setFavorite(!favorite)

        if(copy.favorites.length === 0) {
            copy.favorites.push(facility);
            await db.collection('users').doc(currentUser?.uid).update(copy)
        } else {
            if (copy.favorites.some(e => e.id === facility.id)) {
                copy.favorites = user.favorites.filter(item => item.id !== facility.id)
                db.collection('users').doc(currentUser?.uid).update(copy)
                return
            } else {
                copy.favorites.push(facility);
                db.collection('users').doc(currentUser?.uid).update(copy)
                return
            }
        }
	}

    return (
        <>
                {
                    loading ?
                    <Loading />
                    
                    :

                    facility && 
                    <Page title={facility?.name}>
                        <div className="single-facility-section">
                                <div className="facility-heading">
                                    <img alt="facility-logo" src={facility.logo}/>
                                    <div className="name-and-favorite">
                                        <div>
                                            <h1>{facility.name}</h1>
                                            <h3>{facility.location}</h3>
                                        </div>
                                        {
                                            currentUser &&
                                            <AiOutlineHeart className={favorite ? "favorite" : ""} onClick={handleFavorite}/>
                                        }
                                    </div>
                                </div>
                                <div className="single-content-section">
                                    <div>
                                        <div className="facility-info">
                                            <FacilityInfo information={facility}/>
                                        </div>
                                        <GoogleMaps name={facility.name}/>
                                    </div>
                                    
                                    <div className="facility-calendar">
                                        <Calendar calendar={facility?.appointments} user={user} setLoginAndRegister={setLoginAndRegister}/>
                                    </div>
                                </div>
                            </div>
                    </Page>
                }
        </>
    )
}

export default Facility
