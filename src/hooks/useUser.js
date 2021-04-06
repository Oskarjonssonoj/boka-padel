import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { useAuth } from '../contexts/ContextComponent'

const useUser = (userId) => {

	// States
	const [user, setUser] = useState()
	const [loading, setLoading] = useState(true)

    // Contexts
	const { currentUser } = useAuth()

	// Effects
	useEffect(() => {
		setLoading(true)

		const unmount = db.collection('users').doc(userId).onSnapshot(doc => {
			setUser({
				id: doc.id,
				...doc.data()
			})
		})

		setLoading(false)
		return unmount

	}, [userId])

	return { user, loading }
}

export default useUser