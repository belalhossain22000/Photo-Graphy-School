import React, { createContext, useEffect, useState } from 'react';

import {

    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,

} from "firebase/auth";
import app from '../firebase/firebase.config';
import axios from 'axios'

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});

    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider();

    //google login

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    };


    //register userr with email and password
    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };
    //login user---
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    };
    //logout user----------
    const logOut = () => {
        localStorage.removeItem("access_token")
        setLoading(true)
        return signOut(auth);
    };


    //onauth state change

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (loggedInUser) => {
            setUser(loggedInUser);

            if(loggedInUser?.email){
                axios.post("https://server-nine-theta-40.vercel.app/jwt",{email:loggedInUser.email})
                .then(data=>{
                    localStorage.setItem("access_token", data.data.token)
                    setLoading(false)
                    console.log(data.data.token)
                })
            }else{
                localStorage.removeItem("access_token")
                setLoading(false)
            }
           
        });
        return () => {
            unSubscribe();
        };
    }, []);

//theme
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }


    const authInfo = {
        user,
        registerUser,
        auth,
        loginUser,
        logOut,
        googleLogin,

        loading,
        setLoading,
        theme,
        setTheme,
        toggleTheme

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;