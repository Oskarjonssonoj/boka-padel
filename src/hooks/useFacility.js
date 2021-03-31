
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

const useFacility = (facilityId) => {

	// States
	const [facility, setFacility] = useState();

	// Effects
	useEffect(() => {

		const unmount = db.collection('facilities').doc(facilityId).onSnapshot(doc => {
			setFacility({
				id: doc.id,
				...doc.data()
			})
		})

		return unmount

	}, [facilityId])


	return { facility };
}

export default useFacility;