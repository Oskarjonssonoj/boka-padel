import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'

const useFacilities = () => {

	// States
	const [facilities, setFacilities] = useState([])

	// Effects
	useEffect(() => {
		const unmount = db.collection('facilities').onSnapshot(snapshot => {
				const renderSnapFacilities = []

				snapshot.forEach(doc => {
					renderSnapFacilities.push({
						id: doc.id,
						...doc.data()
					})
				})

			setFacilities(renderSnapFacilities)
		})

		return unmount
	}, [])

	return { facilities }
}

export default useFacilities