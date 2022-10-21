import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from '../firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoding] = useState(true);
    
    const createUser = (email, password) =>{
        setLoding(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) =>{
        setLoding(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        setLoding(true);
        return signOut(auth)
    }
    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('Current user inside state change', currentUser);
            setUser(currentUser);
            setLoding(false);
        })
        return () => unSubscribe();
    }, [])
    const authInfo = { user, loading, createUser, signIn, logOut }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;