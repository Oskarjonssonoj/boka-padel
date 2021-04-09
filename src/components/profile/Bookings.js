import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase/firebase';
import { useAuth } from '../../contexts/ContextComponent';
import { BiCalendar } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { HiOutlineLocationMarker } from "react-icons/hi";
import SmallLoader from '../../shared/components/loading/SmallLoader';
import Animate from 'react-smooth'
import useFacility from '../../hooks/useFacility'

const Bookings = ({user}) => {

    const [facilityId, setFacilityId] = useState()
    const [cancelBooking, setCancelBooking] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState({
        court_name_index: null,
        booking_id: null,
        list_id: null
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
        setCancelBooking(true)
    }

    const closeCancelBooking = () => {
        setCancelBooking(false)
    }

    const confirmCancelBooking = () => {
        let facilityCopy = ({ ...facility });
        let userCopy = ({ ...user });

        facilityCopy =
        facilityCopy.appointments.forEach(appointment => {
            if(appointment.name === selectedIndex.court_name_index) {
                
                userCopy.bookings.forEach(booking => {
                    if(booking.court === selectedIndex.court_name_index) {                    
                        
                        if(booking.information.time_id == selectedIndex.booking_id) {
            
                            appointment.times.forEach(time => {
                                if(booking.information.time_id === time.time_id) {
                                    time.booked = false
                                    userCopy.bookings.splice(selectedIndex.list_id)
                                    
                                    db.collection('facilities').doc(facilityId).update(facilityCopy)
                                    db.collection('users').doc(currentUser.uid).update(userCopy)
                                }
                            })
                        }
                    }
                })
            }
        })
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
                                <div>
                                    <button onClick={closeCancelBooking}>Avbryt</button>
                                    <button onClick={confirmCancelBooking}>Bekräfta avbokning</button>
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
