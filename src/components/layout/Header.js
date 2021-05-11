import React, { useState } from 'react'
import { startOfURL } from '../../shared/helpers/UrlHelper'
import { AiOutlineLogin } from "react-icons/ai";
import Logo from '../../assets/images/logo.png'
import {NavLink, useHistory} from 'react-router-dom'
import './styles/layout.scss'
import useUser from '../../hooks/useUser';
import { useAuth } from '../../contexts/ContextComponent';
import { AiFillClockCircle } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import Animate from 'react-smooth'
import SmallLoader from '../../shared/components/loading/SmallLoader';

const Header = ({setLoginAndRegister}) => {
    
    const {currentUser, logout} = useAuth()
    const { user, userLoading } = useUser(currentUser?.uid)
    const history = useHistory()

    const [openClose, setOpenClose] = useState(false)

    const home = () => {
        history.push("/")
    }

    const toggle = () => {
        setOpenClose(!openClose)
    }

    const handleLogout = async () => {
        logout()
        history.push('/')
    }
    

    return (
        <>
            <div className="header-section">
                <div className="small-header">
                    <h1 onClick={home}>BokaPadel</h1>
                    <img src={Logo} alt="logo"/>
                </div>

                <ul>
                    <NavLink className={startOfURL() === undefined ? "active" : ""} exact to="/"><li>Sök Tider</li></NavLink>
                    <NavLink className={startOfURL() === 'facilities' ? "active" : ""} exact to="/facilities"><li>Anläggningar</li></NavLink>
                    {
                        currentUser ?
                        <NavLink className={startOfURL() === 'profile' ? "active" : ""} exact to="/profile"><li>Min Profil</li></NavLink>
                        :
                        <li onClick={() => setLoginAndRegister(true)}>Min Profil</li>
                    }   
                </ul>

                <div className="menu-btn" onClick={toggle} id={openClose ? 'open' : ''}>
                    <div className="menu-btn_burger"></div>
                </div>
            </div>

            <div className="slideInMenu" id={openClose ? 'activeMenu' : ''}>
                <ul>
                    <NavLink className={startOfURL() === undefined ? "active" : ""} onClick={toggle} exact to="/"><li>Sök Tider</li></NavLink>
                    <NavLink className={startOfURL() === 'facilities' ? "active" : ""} onClick={toggle} exact to="/facilities"><li>Anläggningar</li></NavLink>
                    {
                        currentUser ?
                        <NavLink className={startOfURL() === 'profile' ? "active" : ""} onClick={toggle} exact to="/profile"><li>Min Profil</li></NavLink>
                        :
                        <li onClick={() => setLoginAndRegister(true)}>Min Profil</li>
                    }

                    {
                        currentUser ? 
                        <>
                            <div>
                                <p onClick={handleLogout}>Logga ut</p>
                                <AiOutlineLogin />
                            </div>
                        </>

                        :

                        <div className="sidebar-login">
                            <p onClick={() => setLoginAndRegister(true)}>Logga in</p>
                            <AiOutlineLogin />
                        </div>
                    } 
                </ul>
            </div>
        </>
    )
}

export default Header
