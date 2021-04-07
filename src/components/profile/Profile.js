import React from 'react'
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

const Profile = () => {

    const {currentUser} = useAuth()
    const {user} = useUser(currentUser.uid)

    console.log(user)

    return (
        <div className="profile-section">
            <div className="profile-header">
                <Gravatar default="mp" email={user?.email} className="avatar-big" size={200}/>
                <div className="name-and-currency">
                    <p>{user?.balance} SEK</p>
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
                    <Bookings bookings={user?.bookings}/>
                </div>
            </div>

        </div>
    )
}

export default Profile
