import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { useAuth } from '../contexts/ContextComponent'

const useUser = (userId) => {

	// States
	const [user, setUser] = useState()
	const [userLoading, setUserLoading] = useState(true)

    // Contexts
	const { currentUser } = useAuth()

	// Effects
	useEffect(() => {
		setUserLoading(true)

		const unmount = db.collection('users').doc(userId).onSnapshot(doc => {
			setUser({
				id: doc.id,
				...doc.data()
			})
		})

		setUserLoading(false)
		return unmount

	}, [userId])

	return { user, userLoading }
}

export default useUser