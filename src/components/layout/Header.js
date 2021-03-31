import React from 'react'
import { startOfURL, atHomePage } from '../../shared/helpers/UrlHelper'
import {NavLink} from 'react-router-dom'
import './styles/layout.scss'

const Header = () => {
    return (
        <div className="header-section">
            <ul>
                <li><NavLink className={startOfURL() === "" ? "active" : ""} exact to="/">Sök Tider</NavLink></li>
                <li><NavLink className={startOfURL() === "facilities" ? "active" : ""} exact to="/facilities">Anläggningar</NavLink></li>
                <li><NavLink className={startOfURL() === "profile" ? "active" : ""} exact to="/profile">Min Profil</NavLink></li>
            </ul>
        </div>
    )
}

export default Header
