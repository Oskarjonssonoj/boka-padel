import React from 'react'
import { BiCalendar } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { HiOutlineLocationMarker } from "react-icons/hi";
import SmallLoader from '../../shared/components/loading/SmallLoader';

const Bookings = ({bookings}) => {
    return (
        <div className="bookings-section">
            <div className="header">
                <BiCalendar />
                <h5>Bokade tider</h5>
            </div>
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
                        bookings &&
                        bookings.map(booking => {
                            return (
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
                                    <td>
                                        <ImCross className="remove"/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                !bookings &&
                <SmallLoader />
            }
        </div>
    )
}

export default Bookings
