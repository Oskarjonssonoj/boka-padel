import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.js'
import { BounceLoader } from 'react-spinners'

const AuthContext = createContext()

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
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