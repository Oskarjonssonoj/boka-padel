import React, {useState} from 'react'
import './styles/layout.scss'
import { AiOutlineLogin } from "react-icons/ai";
import Gravatar from "react-gravatar";
import Logo from '../../assets/images/logo.png'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Sidebar = () => {

    const [value, onChange] = useState(new Date());

    return (
        <div className="sidebar-section">
            <div className="sidebar-upper-section">
                <div className="sidebar-header">
                    <h1>BokaPadel</h1>
                    <img src={Logo} alt="logo"/>
                </div>

                <div className="search-section">
                    <input type="date"/>
                </div>
            </div>

            <div className="profile-section">
                <div>
                    <Gravatar email={'oskar.jonsson13@gmail.com'} className="avatar"/>
                </div>
                <div>
                    <p>Logout</p>
                    <AiOutlineLogin />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
