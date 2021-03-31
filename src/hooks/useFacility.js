
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

const useFacility = (facilityId) => {

	// States
	const [facility, setFacility] = useState();
	const [loading, setLoading] = useState(true)

	// Effects
	useEffect(() => {
		setLoading(true)

		const unmount = db.collection('facilities').doc(facilityId).onSnapshot(doc => {
			setFacility({
				id: doc.id,
				...doc.data()
			})
		})

		setLoading(false)
		return unmount

	}, [facilityId])


	return { facility, loading };
}

export default useFacility;