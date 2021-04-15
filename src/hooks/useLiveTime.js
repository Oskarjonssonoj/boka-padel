import { useEffect, useState } from 'react'
import moment from 'moment';

const useLiveTime = () => {

	// States
	const [liveTime, setLiveTime] = useState(moment().format('HH:mm:ss'))
	const [day, setDay] = useState(moment().format('ddd'))
    const [date, setDate] = useState(moment().format('D MMM'))

	// Effects
	useEffect(() => {
        setInterval(() => {
            setLiveTime(moment().format('HH:mm:ss'))
			setDay(moment().format('ddd'))
            setDate(moment().format('D MMM'))
        }, 1000)
    }, [liveTime])

	return { liveTime, day, date }
}

export default useLiveTime