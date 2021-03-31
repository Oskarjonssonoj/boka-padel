import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './styles/layout.scss'
import { AiOutlineLogin } from "react-icons/ai";
import Gravatar from "react-gravatar";
import Logo from '../../assets/images/logo.png'
import moment from 'moment';
import 'react-calendar/dist/Calendar.css'

const Sidebar = () => {

    const [time, setTime] = useState(moment().format('hh:mm:ss'))
    const [currentDay, setCurrentDay] = useState(moment().format('ddd'))
    const [date, setDate] = useState(moment().format('D MMM'))

    const history = useHistory()

    useEffect(() => {
        setInterval(() => {
            setTime(moment().format('hh:mm:ss'))
            setCurrentDay(moment().format('ddd'))
            setDate(moment().format('D MMM'))
        }, 1000)
    }, [time, currentDay, date])

    const home = () => {
        history.push("/")
    }

    return (
        <div className="sidebar-section">
            <div className="sidebar-upper-section">
                <div className="sidebar-header">
                    <h1 onClick={home}>BokaPadel</h1>
                    <img src={Logo} alt="logo"/>
                </div>

                <div className="time-info-section">
                    <p>{currentDay}</p>
                    <p>{date}</p>
                    <p>{time}</p>
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
