import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from './../Firebase/Firebase.config';
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth/web-extension";


export const AuthContext = createContext(null)
const gitHubProvider = new GithubAuthProvider()
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    const registerByFiled = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
   
    }
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const gitHub = () => {
    setLoading(true)
    return signInWithPopup(auth, gitHubProvider)
    }
    const google = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    },[])
    const authInfo = {
        user,
        loading,
        registerByFiled,
        login,
        gitHub,
        google
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;