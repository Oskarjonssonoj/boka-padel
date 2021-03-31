import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFacility from '../../hooks/useFacility'
import GoogleMaps from '../../shared/components/google/GoogleMaps'
import FacilityInfo from './FacilityInfo'
import './styles/facility.scss'

const Facility = () => {

    const { id } = useParams()
    const { facility } = useFacility(id)
    console.log(facility)

    return (
        <>
            {
                facility && 
                <div className="single-facility-section">
                    <div className="facility-heading">
                        <h1>{facility.name}</h1>
                        <h3>{facility.location}</h3>
                    </div>
                    <GoogleMaps name={facility.name}/>

                    <div className="facility-info">
                        <FacilityInfo information={facility}/>
                    </div>
                </div>
            }
        </>
    )
}

export default Facility
