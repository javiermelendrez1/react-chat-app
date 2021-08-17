import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../../firebase';

import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth(); //calling useAuth to populate the user variable
    //create a state for loading 
    const[loading,setLoading] = useState(true);
    console.log(user);
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/'); //renavigate back to login form
    }
    //call this useeffect when this component loads
    useEffect(() => {
        if(!user){
            history.push('/'); //returns to home page if no user
            return;
        }
        //if we do have a user make api request to chat engine
        //the seceond parameters is the options object 
        axios.get('https://api.chatengine.io/users/me',{
            headers: {
                "project-id": "308b1035-04b6-42e7-af3a-088824226875",
                "user-name": user.email,
                "user-secret": user.id,
            }
        }).then(() => {
            //set the loading to false 
            setLoading(false);
        }).catch(() => {
            let formData = new FormData();
            formData.append('email', user.email);
            formData.append('username', user.displayName);
            formData.append('secret', user.uid);

        })
    }, [user,history]);
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Firebase Chat
                </div>
                <div className="logout-tab"
                    onClick={handleLogout}
                >
                    Logout
                </div>

            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectId="308b1035-04b6-42e7-af3a-088824226875"
                userName="."
                userSecret="."
            />
        </div>
    );

};
export default Chats;