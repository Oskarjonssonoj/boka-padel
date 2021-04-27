import React from 'react'
import './styles/google-maps.scss'

const GoogleMaps = ({name}) => {
    return (
        <>
        {
            name && name === "PDL Center" ?
            <div className="mapouter">
                <div className="gmap_canvas">
                    <iframe
                        title="PDL" 
                        className="gmap_iframe" width="100%" 
                        frameborder="0" 
                        scrolling="no" 
                        marginheight="0" 
                        marginwidth="0" 
                        src="https://maps.google.com/maps?width=370&amp;height=300&amp;hl=en&amp;q=PDL Västra&amp;t=h&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    </iframe>
                </div>
            </div>

            : name && name === "Padel Crew" ?
            <div className="mapouter">
                <div className="gmap_canvas">
                    <iframe 
                        title="Padel Crew" 
                        className="gmap_iframe" width="100%" 
                        frameborder="0" 
                        scrolling="no" 
                        marginheight="0" 
                        marginwidth="0" 
                        src="https://maps.google.com/maps?width=370&amp;height=300&amp;hl=en&amp;q=padel crew tofta&amp;t=h&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    </iframe>
                </div>
            </div>
            
            : name && name === "Malmö Padel Center" ?
            <div className="mapouter">
                <div className="gmap_canvas">
                    <iframe 
                        title="MPC" 
                        className="gmap_iframe" width="100%" 
                        frameborder="0" 
                        scrolling="no" 
                        marginheight="0" 
                        marginwidth="0" 
                        src="https://maps.google.com/maps?width=370&amp;height=300&amp;hl=en&amp;q=malmö padel center&amp;t=h&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    </iframe>
                </div>
            </div>

            : name && name === "Padel Court no.9" ?
            <div className="mapouter">
                <div className="gmap_canvas">
                    <iframe 
                        title="MPC" 
                        className="gmap_iframe" width="100%" 
                        frameborder="0" 
                        scrolling="no" 
                        marginheight="0" 
                        marginwidth="0" 
                        src="https://maps.google.com/maps?q=Padel%20Court%20no&t=k&z=13&ie=UTF8&iwloc=&output=embed">
                    </iframe>
                </div>
            </div>

            : ""
        }
        </>
    )
}

export default GoogleMaps
