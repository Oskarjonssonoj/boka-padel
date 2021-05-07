import React from 'react'
import { useHistory } from 'react-router-dom'
import useCurrentTime from '../../hooks/useCurrentTime';
import useFacilities from '../../hooks/useFacilities';
import Page from '../../shared/pages/Page';
import { ImCross } from "react-icons/im";
import { BiCalendar } from "react-icons/bi";
import './styles/booking.scss'
import Animate from 'react-smooth'
import SmallLoader from '../../shared/components/loading/SmallLoader';

const Booking = () => {

    const history = useHistory()
    const { facilities } = useFacilities()
    const { timeUpdate } = useCurrentTime()

    const goToFacility = (id, e) => {
        if(e.target.id === "no-times") {
            return
        } else {
            history.push(`/facilities/${id}`)
        }
    }


    return (
        <Page title="Sök Tider">
            <div className="booking-section">
                <div className="booking-header">
                    <BiCalendar />
                    <h1>Sök Tider</h1>
                </div>
                <div className="booking-content-section">

                {
                    !facilities ?

                    <SmallLoader />

                    :
                
                    <Animate to="1" from="0" attributeName="opacity" duration="1000">
                        <table className="all-facilities-section">
                            <thead>
                                <tr>
                                    <th>Hall</th>
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
                                    facilities?.map(facility => {
                                        return (
                                            <tr>
                                                <td>{facility?.name}</td>
                                                {   
                                                    facility?.time_amount?.map((time) => {
                                                        
                                                        if(time.end_time) {
                                                            if(time.end_time <= timeUpdate) {
                                                            
                                                                return(
                                                                    <td className="passed">
                                                                        <ImCross />
                                                                    </td>
                                                                )
                                                            } else {
                                                                return (
                                                                    <td className="open" onClick={(e) => goToFacility(facility.id, e)} id={time.available_courts === 0 && "no-times"}>
                                                                        {
                                                                            time.available_courts === 0 ?
                                                                            ""
                                                                            :
                                                                            time.available_courts   
                                                                        }
                                                                    </td>
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
                    </Animate>
                    }
                </div>
            </div>
        </Page>
    )
}

export default Booking
