import { useEffect, useState } from 'react'
import moment from 'moment';

const useCurrentTime = () => {

	// States
	const [currentDay, setCurrentDay] = useState(moment().format('L'))

	// Effects
	useEffect(() => {
        setInterval(() => {
            setCurrentDay(moment().format('L'))
        }, 1000)
    }, [currentDay])

	return { currentDay }
}

export default useCurrentTime