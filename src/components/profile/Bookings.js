import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { db } from '../../firebase/firebase';
import { useAuth } from '../../contexts/ContextComponent';
import { BiCalendar } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiFillCloseCircle, AiFillCalendar, AiFillClockCircle, AiFillCreditCard } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { GiTennisCourt } from "react-icons/gi";
import SmallLoader from '../../shared/components/loading/SmallLoader';
import Animate from 'react-smooth'
import useFacility from '../../hooks/useFacility'
import moment from 'moment';
import ButtonLoaderSmall from '../../shared/components/loading/ButtonLoaderSmall';

const Bookings = ({user}) => {

    const [facilityId, setFacilityId] = useState()
    const [cancelBooking, setCancelBooking] = useState(false)
    const [confirm, setConfirm] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState({
        court_name_index: null,
        booking_id: null,
        list_id: null
    })
    const [confirmCancelTime, setConfirmCancelTime] = useState({
        time: null,
        price: null,
        code: null,
        court: null,
        city: null,
        facility: null,
        date: null,
        information: null,
    })

    const { facility } = useFacility(facilityId)
    const {currentUser} = useAuth()

    const getFacilityBooking = (index, facility_id, booking_id) => {
        setFacilityId(facility_id)
        setSelectedIndex(selectedIndexes => ({
            ...selectedIndexes,
            court_name_index: user?.bookings[index].court,
            booking_id: booking_id,
            list_id: index
        }))
        setConfirmCancelTime(confirmCancelTime => ({ 
            ...confirmCancelTime,
            time: user?.bookings[index].time,
            price: user?.bookings[index].price,
            code: user?.bookings[index].code,
            court: user?.bookings[index].court,
            city: user?.bookings[index].city,
            facility: user?.bookings[index].facility,
            date: user?.bookings[index].date,
            information: user?.bookings[index].information,
        }))
        setCancelBooking(true)
    }

    const closeCancelBooking = () => {
        setCancelBooking(false)
    }

    const confirmPayment = (e) => {
        if(e.target.checked) {
            setConfirm(false)
        } else {
            setConfirm(true)
        }
    }

    const confirmCancelBooking = () => {
        setProcessing(true)

        let facilityCopy = ({ ...facility });
        let userCopy = ({ ...user });
        
        const request = setInterval(() => {

        facilityCopy =
        facilityCopy.appointments.forEach(appointment => {
            if(appointment.name === selectedIndex.court_name_index) {
                
                userCopy.bookings.forEach(booking => {
                    if(booking.court === selectedIndex.court_name_index) {                    
                        
                        if(booking.information.time_id == selectedIndex.booking_id) {
            
                            appointment.times.forEach(time => {
                                if(booking.information.time_id === time.time_id) {
                                    clearInterval(request)
                                    
                                    time.booked = false
                                    time.user_id = null
                                    userCopy.bookings = user.bookings.filter(item => item.information.time_id !== time.time_id)
                                    userCopy.balance = userCopy.balance + time.price

                                        db.collection('facilities').doc(facilityId).update(facilityCopy)
                                        db.collection('users').doc(currentUser.uid).update(userCopy)

                                        setProcessing(false)
                                        setCancelBooking(false)
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }, 1000)
    }

    return (
        <div className="bookings-section">
            <div className="header">
                <BiCalendar />
                <h5>Bokade tider</h5>
            </div>
            {
                !user?.bookings ?
                <SmallLoader />

                :

                user?.bookings.length >= 1 ? 

                <table>
                    <thead>
                        <tr>
                            <th id="place">Plats</th>
                            <th id="time">Datum / Tid</th>
                            <th id="rest">Bana</th>
                            <th id="rest">Kod</th>
                            <th id="rest"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            user &&
                            user.bookings.map((booking, index) => {
                                return (
                                    <Animate to="1" from="0" attributeName="opacity">
                                    <tr>
                                        <td className="logo-and-facility">
                                            <img alt="logo" src={booking.logo}/>
                                            <div>
                                                <p>{booking.facility}</p>
                                                <p className="location">
                                                    <HiOutlineLocationMarker className="location"/>
                                                    {booking.city}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{booking.date}</p>
                                            <p>{booking.time}</p>
                                        </td>
                                        <td>
                                            <p>{booking.court}</p>
                                        </td>
                                        <td>
                                            <p>{booking.code}</p>
                                        </td>
                                        <td index={index}>
                                            <ImCross className="remove" onClick={(e) => getFacilityBooking(index, booking.facility_id, booking.information.time_id)}/>
                                        </td>
                                    </tr>
                                    </Animate>
                                )
                            })
                        }
                    </tbody>
                </table>
                : 
                <>
                    <Animate to="1" from="0" attributeName="opacity">
                        <div className="no-bookings">
                            <p>Du har inga kommande bokningar, klicka <Link to="/">här</Link> för att boka</p>
                        </div>
                    </Animate>
                </>
            }
           {
                cancelBooking &&
                <Animate to="1" from="0" attributeName="opacity" duration="300">
                    <div className="cancel-booking">
                        <Animate to="1" from="0" attributeName="opacity" duration="1000">
                            <div className="cancel-booking-window">
                                <div className="header">
                                    <h5>Avboka tid - <span>{confirmCancelTime?.facility} {confirmCancelTime?.city}</span></h5>
                                    <AiFillCloseCircle onClick={closeCancelBooking}/>
                                </div>
                                <div className="body">
                                    <div className="first-row">
                                        <div className="location">
                                            <HiLocationMarker />
                                            <p>{confirmCancelTime?.facility} {confirmCancelTime?.city}</p>
                                        </div>
                                        <div className="date">
                                            <AiFillCalendar />
                                            <p>{moment().format('L')}</p>
                                        </div>
                                    
                                        <div className="location">
                                            <GiTennisCourt />
                                            <p>{confirmCancelTime.court}</p>
                                        </div>
                                        <div className="date">
                                            <AiFillClockCircle />
                                            <p>{confirmCancelTime.time}</p>
                                        </div>
                                    </div>
                                    <div className="second-row">
                                        <h4>Betalning</h4>
                                        <p><span>Belopp:</span> {confirmCancelTime.price} SEK (varav {0.06 * confirmCancelTime.price} SEK Moms)</p>
                                        <p><span>Betalmetod:</span> Konto</p>
                                        <p className="confirm">Stämmer ovanstående uppgifter in på din bokning? <input type="checkbox" onClick={(e) => confirmPayment(e)}/></p>
                                    </div>
                                    <div className="third-row">
                                        <h4>Återbetalning</h4>
                                        <p>Vid avbokning kommer beloppet du betalade för bokning sättas tillbaka på ditt konto. Tiden för överföring kan variera beroende på belastning och tryck på hemsidan. Pengarna blir tillgängliga på ditt konto så fort du ser dem åter påfyllda. Har du inte mottagit din återbetalning inom 24 timmar hänvisar vi dig att kontakta kundtjänst</p> 
                                    </div>
                                    <div className="buttons-section">
                                        <button onClick={closeCancelBooking}>Avbryt</button>
                                        <button disabled={confirm} onClick={confirmCancelBooking} className="confirm">
                                            {
                                                processing ?
                                                <ButtonLoaderSmall />
                                                :
                                                "Bekräfta avbokning"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Animate>
                    </div>
                </Animate>
           }
        </div>
    )
}

export default Bookings
