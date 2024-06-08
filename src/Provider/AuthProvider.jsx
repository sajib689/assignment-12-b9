import {GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from './../Firebase/Firebase.config';
import useAxiosSecure from "../Hooks/useAxiosSecure";


export const AuthContext = createContext(null)
const gitHubProvider = new GithubAuthProvider()
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const axiosSecure = useAxiosSecure()
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
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser)
            if(currentUser) {
                axiosSecure.post('/jwt', {email: currentUser?.email})
                .then(res => {
                    console.log(res.data)
                    localStorage.setItem('token', data.data.token)
                })
            }
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
        google,
        logout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;