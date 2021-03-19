import React from 'react'
import './styles/layout.scss'

const Header = () => {
    return (
        <div className="header-section">
            <ul>
                <li><a href="/">Sök Tider</a></li>
                <li><a href="/facilities">Anläggningar</a></li>
                <li><a href="/profile">Min Profil</a></li>
            </ul>
        </div>
    )
}

export default Header
