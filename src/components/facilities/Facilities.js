import React from 'react'
import useFacilities from '../../hooks/useFacilities'
import {Link} from 'react-router-dom'
import './styles/facilities.scss'
import { HiArrowCircleRight } from "react-icons/hi";
import Loading from '../../shared/components/loading/Loading';
import Page from '../../shared/pages/Page';
import Animate from 'react-smooth'

const Facilities = () => {

    const { facilities, loading } = useFacilities()

    return (
        <Page title="Anläggningar">
            <div className="facilities">
                {
                    loading ?
                    <Loading />

                    :

                    facilities?.map(facility => {
                        return (
                            <Animate to="1" from="0" attributeName="opacity">
                                <Link to={`/facilities/${facility.id}`} className="each-facility">
                                    <p>{facility.name}</p>
                                    <HiArrowCircleRight />
                                </Link>
                            </Animate>
                        )
                    })
                }  
            </div>
        </Page>
    )
}

export default Facilities
