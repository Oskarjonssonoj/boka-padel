import React from 'react'
import { startOfURL, atHomePage } from '../../shared/helpers/UrlHelper'
import './styles/layout.scss'

const Header = () => {
    return (
        <div className="header-section">
            <ul>
                <li><a className={atHomePage() ? "active" : ""} href="/">Sök Tider</a></li>
                <li><a className={startOfURL() === "facilities" ? "active" : ""} href="/facilities">Anläggningar</a></li>
                <li><a className={startOfURL() === "profile" ? "active" : ""} href="/profile">Min Profil</a></li>
            </ul>
        </div>
    )
}

export default Header
