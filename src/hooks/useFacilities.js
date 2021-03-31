import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'

const useFacilities = () => {

	// States
	const [facilities, setFacilities] = useState([])
	const [loading, setLoading] = useState(true)

	// Effects
	useEffect(() => {
		const unmount = db.collection('facilities').onSnapshot(snapshot => {
				setLoading(true)
				const renderSnapFacilities = []

				snapshot.forEach(doc => {
					renderSnapFacilities.push({
						id: doc.id,
						...doc.data()
					})
				})

			setFacilities(renderSnapFacilities)
			setLoading(false)
		})

		return unmount
	}, [])

	return { facilities, loading }
}

export default useFacilities