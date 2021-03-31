import React from 'react'
import useFacilities from '../../hooks/useFacilities'
import {Link} from 'react-router-dom'
import './styles/facilities.scss'
import { HiArrowCircleRight } from "react-icons/hi";
import Loading from '../../shared/components/loading/Loading';

const Facilities = () => {

    const { facilities, loading } = useFacilities()

    return (
        <div className="facilities">
            {
                loading ?
                <Loading />

                :

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
