import React, { useState, useEffect } from 'react'
import { db } from '../../firebase/firebase';
import { useParams, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/ContextComponent';
import { AiFillCloseCircle, AiFillCalendar, AiFillClockCircle, AiFillCreditCard } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdInformationCircle } from "react-icons/io";
import { GiTennisCourt } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import useFacility from '../../hooks/useFacility'
import Animate from 'react-smooth'
import moment from 'moment';
import ButtonLoaderSmall from '../../shared/components/loading/ButtonLoaderSmall';
import useCurrentTime from '../../hooks/useCurrentTime';
import useCurrentDay from '../../hooks/useCurrentDay';

const Calendar = ({user, setLoginAndRegister}) => {
    
    const [choosedMethod, setChoosedMethod] = useState(true)
    const [processing, setProcessing] = useState(false)
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
    const { facility } = useFacility(id)
    const { currentUser } = useAuth()
    const { timeUpdate } = useCurrentTime()
    const { currentDay } = useCurrentDay()

    useEffect(() => {
        let facilityCopy = ({ ...facility });
        
        facilityCopy = facility?.appointments.forEach(court => {

            court.times.forEach(time => {

            if(time.date < currentDay) {

                facility.time_amount.forEach(each_time => {       
                    if(each_time.date && each_time.date < currentDay) {

                        each_time.available_courts = facility.appointments.length
                        each_time.time_id = []   
                        each_time.date = null   

                        time.date = null
                        time.booked = false
                        time.user_id = null

                        db.collection('facilities').doc(id).update(facilityCopy)
                    }
                })
            } else if(time.booked && time.end_time <= timeUpdate) {
                facility.time_amount.forEach(each_time => {

                    if(each_time.end_time <= timeUpdate) {
                        each_time.available_courts = facility.appointments.length
                        each_time.time_id = []
                        each_time.date = null                            
                        
                        time.booked = false
                        time.user_id = null
                        time.date = null

                        db.collection('facilities').doc(id).update(facilityCopy)
                    }
                })}
            })
        })
    }, [facility, timeUpdate, currentDay])


    const handleChoice = (index, timeIndex, time) => {

        if(!currentUser) {
            setLoginAndRegister(true)
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
        setProcessing(true)

        let facilityCopy = ({ ...facility });
        let userCopy = ({ ...user });

        
        try {
            if(userCopy.balance > facilityCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].price) {
                const request = setInterval(() => {

                        facilityCopy.time_amount.forEach(time => {
                            if(facilityCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].end_time === time.end_time) {
                                time.available_courts = time.available_courts - 1
                                time.time_id.push(facilityCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].time_id)
                                time.date = currentDay
                            }
                        })

                        facilityCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].booked = true
                        facilityCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].date = currentDay
                        facilityCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].user_id = currentUser?.uid

                        
                        userCopy.bookings.push(confirmSelectedTime)
                        
                        userCopy.balance = userCopy.balance - facilityCopy.appointments[selectedIndexes.court_name_index].times[selectedIndexes.time_index].price
                        

                        db.collection('facilities').doc(id).update(facilityCopy)
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
                                                if(time.end_time) {
                                                    if(time.end_time <= timeUpdate) {
                                                    
                                                    return(
                                                        <td key={timeIndex} index={timeIndex} className={"passed"}>
                                                            <ImCross />
                                                        </td>
                                                    )
                                                    } else {
                                                        return(
                                                        time.booked ?
                                                        <td key={timeIndex} index={timeIndex} id={time.user_id === currentUser?.uid ? "own-booking" : "booked"} className={"booked"}></td>
                                                        : 
                                                        <td key={timeIndex} index={timeIndex} className={"open"} onClick={(e) => handleChoice(index, timeIndex, time)}></td>
                                                    )
                                                    }
                                                }
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

        </div>
    )
}

export default Calendar
