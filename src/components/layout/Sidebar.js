import React, { useEffect, useState, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import './styles/layout.scss'
import { AiOutlineLogin } from "react-icons/ai";
import Gravatar from "react-gravatar";
import Logo from '../../assets/images/logo.png'
import moment from 'moment';
import 'react-calendar/dist/Calendar.css'
import { useAuth } from '../../contexts/ContextComponent';

const Sidebar = () => {

    const [time, setTime] = useState(moment().format('HH:mm:ss'))
    const [currentDay, setCurrentDay] = useState(moment().format('ddd'))
    const [date, setDate] = useState(moment().format('D MMM'))

    const history = useHistory()

    const {currentUser, logout} = useAuth()

    useEffect(() => {
        setInterval(() => {
            setTime(moment().format('HH:mm:ss'))
            setCurrentDay(moment().format('ddd'))
            setDate(moment().format('D MMM'))
        }, 1000)
    }, [time, currentDay, date])

    const home = () => {
        history.push("/")
    }

    const handleLogout = async () => {
        logout()
        history.push('/')
    }

    return (
        <div className="sidebar-section">
            <div className="sidebar-upper-section">
                <div className="sidebar-header">
                    <h1 onClick={home}>BokaPadel</h1>
                    <img src={Logo} alt="logo"/>
                </div>

                <div className="time-info-section">
                    <p>{currentDay} {date}</p>
                    <p>{time}</p>
                </div>

                <div className="open-bookings-section">
                    <h4>Dagens tider - {currentDay} {date}</h4>
                    <div className="open-bookings-container" id="your_div">
                        <ul>
                            <li>
                                <button>Boka</button>
                            </li>
                            <li>
                                <button>Boka</button>
                            </li>
                            <li>
                                <button>Boka</button>
                            </li>
                            <li>
                                <button>Boka</button>
                            </li>
                            <li>
                                <button>Boka</button>
                            </li>
                            <li>
                                <button>Boka</button>
                            </li>
                            <li>
                                <button>Boka</button>
                            </li>
                            <li>
                                <button>Boka</button>
                            </li>
                            <li>
                                <button>Boka</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                {
                    currentUser ? 
                    <>
                        <div>
                            <Gravatar default="mp" email={currentUser?.email} className="avatar"/>
                        </div>
                        <div>
                            <p onClick={handleLogout}>Logga ut</p>
                            <AiOutlineLogin />
                        </div>
                    </>

                    :

                    <div className="sidebar-login">
                        <Link to="/login">Logga in</Link>
                        <AiOutlineLogin />
                    </div>
                }
            </div>
        </div>
    )
}

export default Sidebar
