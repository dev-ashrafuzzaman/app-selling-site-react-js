import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";
import firebaseAppp from "../firebase/firebase.config";
import useUserAuthCheck from "../hooks/web/useUserAuthCheck";

export const AuthContext = createContext(null);
const auth = getAuth(firebaseAppp);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const {WebUser, WebUserloading , WebUserLogout} = useUserAuthCheck();


    // Social Login with Google e
    const googleSigninUser = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //  Create User Auth with gmail and pass
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Login User with email and pass
    const loginUser = async (email, password) => {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    }

    // LogOut user auth
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // update Profile
    const updateProfileUser = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // get and set tocken
            if (currentUser) {
                axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`, { email: currentUser.email })
                    .then(data => {
                        localStorage.setItem('access-token', data.data.token)
                        setLoading(false);
                    })
            } else {
                localStorage.removeItem('access-token')
            }

        });

        return () => {
            return unsubscribe();
        }
    }, [])

  
    const authDetails = {
        user,
        loading,
        WebUser,
        WebUserloading,
        WebUserLogout,
        googleSigninUser,
        createUser,
        loginUser,
        logoutUser,
        updateProfileUser
        
    }


    return (
        <AuthContext.Provider value={authDetails}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;