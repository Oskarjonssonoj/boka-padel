import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineLocationMarker } from "react-icons/hi";
import SmallLoader from '../../shared/components/loading/SmallLoader';

const FavoriteFacilities = ({favorites}) => {
    return (
        <>
            {
                !favorites ?
                <SmallLoader />

                :

                favorites?.length >= 1 ?
                favorites.map(favorite => {
                    return (
                    <div className="each-favorite">
                        <div className="logo-and-name">
                            <img alt="logo" src={favorite?.logo}/>
                            <div className="name-and-location">
                                <p>{favorite?.name}</p>
                                <div>
                                    <HiOutlineLocationMarker />
                                    <p>{favorite?.location}</p>
                                </div>                            
                            </div>
                        </div>
                        <Link to={`/facilities/${favorite?.id}`}>Besök</Link>
                    </div>
                    )
                })

                :

                <div className="no-favorites">
                    <p>Du har inga favoritanläggningar.</p>
                </div>

            }
        </>
    )
}

export default FavoriteFacilities
