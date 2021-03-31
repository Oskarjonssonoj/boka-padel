import React from 'react'
import useFacilities from '../../hooks/useFacilities'
import {Link} from 'react-router-dom'
import './styles/facilities.scss'
import { HiArrowCircleRight } from "react-icons/hi";

const Facilities = () => {

    const { facilities } = useFacilities()

    return (
        <div className="facilities">
            {
                facilities?.map(facility => {
                    return (
                        <Link to={`/facilities/${facility.id}`} className="each-facility">
                            <p>{facility.name}</p>
                            <HiArrowCircleRight />
                        </Link>
                    )
                })
            }  
        </div>
    )
}

export default Facilities
