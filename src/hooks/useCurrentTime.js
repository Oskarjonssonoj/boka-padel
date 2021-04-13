import { useEffect, useState } from 'react'
import moment from 'moment';

const useCurrentTime = () => {

	// States
	const [timeUpdate, setTimeUpdate] = useState(moment().format('HH:mm'))

	// Effects
	useEffect(() => {
        setInterval(() => {
            setTimeUpdate(moment().format('HH:mm'))
        }, 1000)
    }, [timeUpdate])

	return { timeUpdate }
}

export default useCurrentTime