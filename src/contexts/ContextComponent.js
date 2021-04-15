import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebase.js'
import { BounceLoader } from 'react-spinners'

const AuthContext = createContext()

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = (email, password, firstName, lastName) => {
        return auth.createUserWithEmailAndPassword(email, password).then(cred => {
            db.collection('users').doc(cred.user.uid).set({
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                balance: 0,
                bookings: [],
                favorites: [],
                id: cred.user.uid,
                language: null,
                address: null,
                postal_code: null,
                country: null,
                county: null,
                gender: null,
                phone: null,
                date_of_birth: null,
                user_id: cred.user.uid
            })
        })
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
       return auth.signOut()
    }

    const resetPassword = (email) => {
       return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unmount = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unmount;

    }, [])

    const contextValues = {
        currentUser, 
        signup,
        login,
        logout,
        resetPassword,
        loading
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {loading && (
                <div className="d-flex justify-content-center my-5">
                    <BounceLoader color={"#888"} size={50} />
                </div>
                )
            }
            {!loading && props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, useAuth, AuthContextProvider as default };