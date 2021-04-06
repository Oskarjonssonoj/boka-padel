import React from 'react'
import { endOfURL, startOfURL } from '../../shared/helpers/UrlHelper'
import {NavLink} from 'react-router-dom'
import './styles/layout.scss'

const Header = (props) => {
    return (
        <div className="header-section">
            <ul>
                <NavLink className={startOfURL() === undefined ? "active" : ""} exact to="/"><li>Sök Tider</li></NavLink>
                <NavLink className={startOfURL() === 'facilities' ? "active" : ""} exact to="/facilities"><li>Anläggningar</li></NavLink>
                <NavLink className={startOfURL() === 'profile' ? "active" : ""} exact to="/profile"><li>Min Profil</li></NavLink>
            </ul>
        </div>
    )
}

export default Header
