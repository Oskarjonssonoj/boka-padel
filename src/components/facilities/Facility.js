import React, {  } from 'react'
import { useParams } from 'react-router-dom'
import useFacility from '../../hooks/useFacility'
import GoogleMaps from '../../shared/components/google/GoogleMaps'
import Loading from '../../shared/components/loading/Loading'
import Page from '../../shared/pages/Page'
import FacilityInfo from './FacilityInfo'
import './styles/facility.scss'

const Facility = () => {

    const { id } = useParams()
    const { facility, loading } = useFacility(id)

    return (
        <>
                {
                    loading ?
                    <Loading />
                    
                    :

                    facility && 
                    <Page title={facility?.name}>
                        <div className="single-facility-section">
                            <div className="facility-heading">
                                <h1>{facility.name}</h1>
                                <h3>{facility.location}</h3>
                            </div>
                            <div>
                                <div>
                                    <div className="facility-info">
                                        <FacilityInfo information={facility}/>
                                    </div>
                                    <GoogleMaps name={facility.name}/>
                                </div>
                                
                            </div>
                        </div>
                    </Page>
                }
        </>
    )
}

export default Facility
