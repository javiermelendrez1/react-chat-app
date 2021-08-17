import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {auth} from '../firebase' ;
//create context
const AuthContext = React.createContext();
//use the context for later on
export const useAuth = () => useContext(AuthContext);
//react children
//render all jsx passed into auth provider
export const AuthProvider = ({children}) => {
    const[loading,setLoading] = useState(true); //default loading true
    const[user,setUser] = useState(null); //empty objct
    const history = useHistory();
    useEffect(() => {
        //call everytime authstate changes
        auth.onAuthStateChanged((user) => {
            //pass in user and set loading to false
            setUser(user);
            setLoading(false);
            //only route to /chats if we have the user
            if(user) history.push('/chats'); //this will renavigate us to chat applications

        })
    }, [user, history]) //whenever user or history changes we will reacall useEffect
    //whenever workng with auth context you need a single value
    //single value contains user property
    const value = { user };
    //if not loading show children
    return (
        <AuthContext.Provider value={value}>
            {
                !loading && children
            }
        </AuthContext.Provider>
    );
}