import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './styles/layout.scss'
import { AiOutlineLogin } from "react-icons/ai";
import Gravatar from "react-gravatar";
import Logo from '../../assets/images/logo.png'
import 'react-calendar/dist/Calendar.css'
import { useAuth } from '../../contexts/ContextComponent';
import useFacilities from '../../hooks/useFacilities'
import useLiveTime from '../../hooks/useLiveTime';
import useCurrentDay from '../../hooks/useCurrentDay';
import useCurrentTime from '../../hooks/useCurrentTime';
import { AiFillCloseCircle, AiFillCalendar, AiFillClockCircle, AiFillCreditCard } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdInformationCircle } from "react-icons/io";
import { GiTennisCourt } from "react-icons/gi";
import Animate from 'react-smooth'
import moment from 'moment';
import ButtonLoaderSmall from '../../shared/components/loading/ButtonLoaderSmall';
import useUser from '../../hooks/useUser';
import { db } from '../../firebase/firebase';
import SmallLoader from '../../shared/components/loading/SmallLoader';

const Sidebar = ({setLoginAndRegister}) => {

    const [choosedMethod, setChoosedMethod] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [selectedIndexes, setSelectedIndexes] = useState({
        facility_index: null,
        court_name_index: null,
        time_index: null
    })
    const [selectedTime, setSelectedTime] = useState(false)
    const [confirmSelectedTime, setConfirmSelectedTime] = useState({
        time: null,
        price: null,
        code: null,
        court: null,
        city: null,
        facility: null,
        logo: null,
        date: null,
        information: null,
    })

    const history = useHistory()

    const { currentUser, logout } = useAuth()
    const { user, userLoading } = useUser(currentUser?.uid)
    const { facilities, loading } = useFacilities()
    const { liveTime, day, date } = useLiveTime()
    const { currentDay } = useCurrentDay()
    const { timeUpdate } = useCurrentTime()

    const home = () => {
        history.push("/")
    }

    const profile = () => {
        history.push("/profile")
    }

    const handleLogout = async () => {
        logout()
        history.push('/')
    }

    const handleChoice = (e, facilityIndex, courtIndex, timeIndex, time) => {

        let copy = ({ ...facilities });
    
        if(copy[facilityIndex].appointments[courtIndex].name === facilities[facilityIndex].appointments[courtIndex].name && copy[facilityIndex].appointments[courtIndex].times[timeIndex] === facilities[facilityIndex].appointments[courtIndex].times[timeIndex]){

            setSelectedTime(true)
            setSelectedIndexes(selectedIndexes => ({
                ...selectedIndexes,
                facility_index: facilityIndex,
                court_name_index: courtIndex,
                time_index: timeIndex
            }))
            setConfirmSelectedTime(confirmSelectedTime => ({ 
                ...confirmSelectedTime,
                time: facilities[facilityIndex].appointments[courtIndex].times[timeIndex].time,
                price: facilities[facilityIndex].appointments[courtIndex].times[timeIndex].price,
                code: facilities[facilityIndex].code,
                court: facilities[facilityIndex].appointments[courtIndex].name,
                city: facilities[facilityIndex].city,
                facility: facilities[facilityIndex].name,
                logo: facilities[facilityIndex].logo,
                facility_id: facilities[facilityIndex].id,
                information: time
            }))
        }
    }

    const handleBooking = async () => {
        setProcessing(true)

        let facilitiesCopy = ({ ...facilities[selectedIndexes.facility_index] });
        let userCopy = ({ ...user });
        
        try {
            if(userCopy.balance > facilitiesCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].price) {
                const request = setInterval(() => {

                        facilitiesCopy.time_amount.forEach(time => {
                            if(facilitiesCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].end_time === time.end_time) {
                                time.available_courts = time.available_courts - 1
                                time.time_id.push(facilitiesCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].time_id)
                                time.date = currentDay
                            }
                        })

                        facilitiesCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].booked = true
                        facilitiesCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].date = currentDay
                        facilitiesCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].user_id = currentUser?.uid

                        
                        userCopy.bookings.push(confirmSelectedTime)
                        
                        userCopy.balance = userCopy.balance - facilitiesCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].price
                        

                        console.log(facilitiesCopy)
                        console.log(userCopy)
                        db.collection('facilities').doc(facilitiesCopy.id).update(facilitiesCopy)
                        db.collection('users').doc(currentUser?.uid).update(userCopy)
                        
                        setProcessing(false)
                        clearInterval(request)
                        setSelectedTime(false)
    
                        history.push('/profile')
                    
                }, 1000)
            } else {
                return
            }
            

        } catch {
            console.log("Error")
            setProcessing(false)
        }   
    }

    const paymentMethod = (e) => {
        if(e.target.checked) {
            setChoosedMethod(false)
        } else {
            setChoosedMethod(true)
        }
    }

    const handleClose = () => {
        setSelectedTime(false)
    }

    let time_array = []

    return (
        <div className="sidebar-section">
            <div className="sidebar-upper-section">
                <div className="sidebar-header">
                    <h1 onClick={home}>BokaPadel</h1>
                    <img src={Logo} alt="logo"/>
                </div>

                <div className="time-info-section">
                    <p>{day} {date}</p>
                    <p>{liveTime}</p>
                </div>

                <div className="open-bookings-section">
                    <h4>Dagens tider - {day} {date}</h4>
                    <div className="open-bookings-container" id="your_div">
                        <ul>
                            {
                                loading ?

                                <SmallLoader />

                                :

                                facilities &&
                                facilities?.map((facility, facilityIndex) => {
                                    return(
                                        facility?.appointments?.map((court, courtIndex) => {                                            
                                            return (
                                                court.times.map((time, timeIndex) => {
                                                    if(!time.booked && time.end_time > timeUpdate) {        
                                                        return (
                                                            <Animate to="1" from="0" attributeName="opacity" duration="1000">
                                                                <li id={timeIndex}>
                                                                    <div className="facility-info-box">
                                                                        <p>{facility.name} - {facility.city}</p>
                                                                        <p><span>Bana: </span>{court.name}</p>
                                                                        <p className="time"><AiFillClockCircle/> {time.time}</p>
                                                                    </div>
                                                                    <button 
                                                                        onClick={
                                                                            currentUser ?
                                                                            (e) => handleChoice(e, facilityIndex, courtIndex, timeIndex, time)
                                                                            : 
                                                                            () => setLoginAndRegister(true)
                                                                        }
                                                                    >Boka</button>
                                                                </li>
                                                            </Animate>
                                                        )
                                                    }
                                                })
                                            )
                                        })
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                {
                    currentUser &&
                    <div className="upcoming-bookings-section">
                        <div className="time-heading">
                            <BiCalendar />
                            <h4>Kommande tider</h4>
                        </div>
                        <Animate to="1" from="0" attributeName="opacity" duration="1000">
                        <div className="upcoming-bookings-container">
                            <ul>
                                {
                                    userLoading ?

                                    <SmallLoader />

                                    :

                                    user?.bookings?.length < 1 ?
                                    <Animate to="1" from="0" attributeName="opacity" duration="1000">
                                        <p className="no-bookings">Du har för tillfället inga bokningar</p>
                                    </Animate> 

                                    : 
                                    
                                    user?.bookings?.map(booking => {
                                        return (
                                            <Animate to="1" from="0" attributeName="opacity" duration="500">
                                                <li>
                                                    <div className="facility-info-box">
                                                        <p>{booking.facility} - {booking.city}</p>
                                                        <p><span>Bana: </span>{booking.court}</p>
                                                        <p className="time"><AiFillClockCircle/> {booking.information.time}</p>
                                                    </div>
                                                    <img alt="facility-img" src={booking.logo}/>
                                                </li>
                                            </Animate>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        </Animate>
                    </div>
                }
            </div>

            {
                selectedTime &&

                <Animate to="1" from="0" attributeName="opacity" duration="300">
                    <div className="confirm-booking">
                        <Animate to="1" from="0" attributeName="opacity" duration="1000">
                            <div className="confirm-booking-widow">
                                   <div className="header">
                                       <h5>Boka</h5>
                                       <AiFillCloseCircle onClick={handleClose}/>
                                   </div>

                                   <div className="body">
                                        <div className="first-row">
                                            <div className="location">
                                                <HiLocationMarker />
                                                <p>{confirmSelectedTime?.facility} {confirmSelectedTime?.city}</p>
                                            </div>
                                            <div className="date">
                                                <AiFillCalendar />
                                                <p>{moment().format('L')}</p>
                                            </div>
                                        </div>
                                        <div className="second-row">
                                            <div className="location">
                                                <GiTennisCourt />
                                                <p>{confirmSelectedTime.court}</p>
                                            </div>
                                            <div className="date">
                                                <AiFillClockCircle />
                                                <p>{confirmSelectedTime.time}</p>
                                            </div>
                                            <div className="price">
                                                <AiFillCreditCard />
                                                <p>{confirmSelectedTime.price} SEK</p>
                                            </div>
                                        </div>
                                        <div className="third-row">
                                            <div className="choose">
                                                <p>Välj betalsätt:</p>
                                            </div>
                                            <div className="payment">
                                                <div className="method">
                                                    <input type="checkbox" onClick={paymentMethod}/>
                                                    <p>Betala med konto (<span className="user-currency">{user?.balance} SEK</span>)</p>
                                                </div>
                                                <div className="method">
                                                    <input disabled type="checkbox"/>
                                                    <p>Betala med kredit/bankkort</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="fourth-row">
                                            <div className="terms">
                                                <IoMdInformationCircle />
                                                <p>Läs mer om betalning och ångerrätt under <span>köpvillkor.</span></p>
                                            </div>
                                        </div>
                                        <div className="fifth-row">
                                            <div className="terms">
                                                <IoMdInformationCircle />
                                                <p>Avbokning mot en serviceavgift är möjlig fram till 6 timmar innan bokad tid. Läs om <span>betalningar och avbokningsregler.</span></p>
                                            </div>
                                        </div>
                                   </div>
                                <div className="buttons-section">
                                    <button onClick={handleClose}>Avbryt</button>
                                    <button disabled={choosedMethod} className="confirm" onClick={handleBooking}>
                                        {
                                            processing ?
                                            <ButtonLoaderSmall />
                                            :
                                            "Bekräfta bokning"
                                        }
                                    </button>
                                </div> 
                            </div>
                        </Animate>
                    </div>
                </Animate>
            }

            <div className="profile-section">
                {
                    currentUser ? 
                    <>
                        <div onClick={profile}>
                            <Gravatar default="mp" email={currentUser?.email} className="avatar"/>
                        </div>
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
            </div>
        </div>
    )
}

export default Sidebar
