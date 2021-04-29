import React, { useState } from 'react'
import './styles/profile.scss'
import {Link} from 'react-router-dom'
import Gravatar from "react-gravatar";
import { useAuth } from '../../contexts/ContextComponent';
import useUser from '../../hooks/useUser'
import { MdFavorite } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";
import ProfileInfo from './ProfileInfo';
import Bookings from './Bookings';
import Page from '../../shared/pages/Page'
import FavoriteFacilities from './FavoriteFacilities';
import CardInformation from './CardInformation'
import 'react-credit-cards/es/styles-compiled.css'

const Profile = () => {

    const [payment, setPaymnet] = useState(false)

    const {currentUser} = useAuth()
    const {user} = useUser(currentUser.uid)

    return (
        <Page title="Min Profil">
            <div className="profile-section">
                <div className="profile-header">
                    <Gravatar default="mp" email={user?.email} className="avatar-big" size={200}/>
                    <div className="name-and-currency">
                        <p onClick={() => setPaymnet(true)}>{user?.balance} SEK</p>
                        <h3>{user?.first_name} {user?.last_name}</h3>
                    </div>
                    <div className="edit-user">
                        <Link to="/profile/edit">
                            <FaRegEdit />
                            <p>Redigera profil</p>
                        </Link>
                    </div>
                </div>

                <div className="user-information">
                    <div className="left-section">
                        <div className="favorite-facilities">
                            <div className="header">
                                <MdFavorite />
                                <h5>Favoritanläggningar</h5>
                            </div>

                            <div className="body">
                                <FavoriteFacilities favorites={user?.favorites}/>
                            </div>
                        </div>

                        <div className="user-info-section">
                            <div className="header">
                                <CgProfile />
                                <h5>Personlig information</h5>
                            </div>

                            <div className="body">
                                <ProfileInfo user={user}/>
                            </div>
                        </div>
                    </div>

                    <div className="right-section">
                        <Bookings user={user}/>
                    </div>
                </div>

                {
                    payment &&
                    <CardInformation setPaymnet={setPaymnet}/>
                }

            </div>
        </Page>
    )
}

export default Profile
