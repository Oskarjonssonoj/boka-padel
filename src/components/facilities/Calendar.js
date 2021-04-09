import React, { useState } from 'react'
import { db } from '../../firebase/firebase';
import { useParams, history, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/ContextComponent';
import { AiFillCloseCircle, AiFillCalendar, AiFillClockCircle, AiFillCreditCard } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdInformationCircle } from "react-icons/io";
import { GiTennisCourt } from "react-icons/gi";
import useFacility from '../../hooks/useFacility'
import Animate from 'react-smooth'
import moment from 'moment';

const Calendar = ({user}) => {

    const [choosedMethod, setChoosedMethod] = useState(true)
    const [selectedIndexes, setSelectedIndexes] = useState({
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
    const { id } = useParams()
    const { facility, loading } = useFacility(id)
    const {currentUser} = useAuth()


    const handleChoice = (e, index, timeIndex, time) => {

        if(e.target.id === "booked") {
            return
        } else {
            let copy = ({ ...facility });
    
            if(copy.appointments[index].name === facility.appointments[index].name && copy.appointments[index].times[timeIndex] === facility.appointments[index].times[timeIndex]){
                setSelectedTime(true)
                setSelectedIndexes(selectedIndexes => ({
                    ...selectedIndexes,
                    court_name_index: index,
                    time_index: timeIndex
                }))
                setConfirmSelectedTime(confirmSelectedTime => ({ 
                    ...confirmSelectedTime,
                    time: facility.appointments[index].times[timeIndex].time,
                    price: facility.appointments[index].times[timeIndex].price,
                    code: facility?.code,
                    court: facility.appointments[index].name,
                    city: facility?.city,
                    facility: facility?.name,
                    logo: facility?.logo,
                    facility_id: facility?.id,
                    information: time
                }))
            }
        }
    }

    const handleBooking = async () => {
        let facilityCopy = ({ ...facility });
        let userCopy = ({ ...user });
        

        try {
            facilityCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].booked = true
            userCopy.bookings.push(confirmSelectedTime)
            
            await db.collection('facilities').doc(id).update(facilityCopy)
            await db.collection('users').doc(currentUser.uid).update(userCopy)

            setSelectedTime(false)

            history.push('/profile')
        } catch {
            console.log("Error")
        }    

    }

    const handleClose = () => {
        setSelectedTime(false)
    }

    const paymentMethod = (e) => {
        if(e.target.checked) {
            setChoosedMethod(false)
        } else {
            setChoosedMethod(true)
        }
    }

    return (
        <div className="facility-calendar-content">
            <table>
                <thead>
                    <tr>
                        <th>Bana</th>
                        <th>06.00</th>
                        <th>07.30</th>
                        <th>09.00</th>
                        <th>10.30</th>
                        <th>12.00</th>
                        <th>13.30</th>
                        <th>15.00</th>
                        <th>16.30</th>
                        <th>18.00</th>
                        <th>19.30</th>
                        <th>21.00</th>
                        <th>22.30</th>
                    </tr>
                </thead>

                <tbody>
                        {
                            facility &&
                            facility?.appointments?.map((court, index) => {
                                return (
                                    <tr>
                                        <td key={index} index={index}>{court.name}</td>
                                        {
                                            court.times.map((time, timeIndex) => {
                                                return(
                                                    time.booked ?
                                                    <td key={timeIndex} index={timeIndex} id={"booked"} className="booked" onClick={(e) => handleChoice(e, index, timeIndex)}></td>
                                                    : 
                                                    <td key={timeIndex} index={timeIndex} className="open" onClick={(e) => handleChoice(e, index, timeIndex, time)}></td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
            </table>

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
                                    <button disabled={choosedMethod} className="confirm" onClick={handleBooking}>Bekräfta bokning</button>
                                </div> 
                            </div>
                        </Animate>
                    </div>
                </Animate>
            }

        </div>
    )
}

export default Calendar
