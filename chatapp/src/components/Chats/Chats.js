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
    ///function to handle getting user image
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob(); // blob are any files like images transfered over inn binary format 
        return new File([data], "userPhoto.jpg", {'type': 'image/jpg'});
    }
    //call this useeffect when this component loads
    useEffect(() => {
        if(!user){
            history.push('/'); //returns to home page if no user
            return;
        }
        //if we do have a user make api request to chat engine
        //the seceond parameters is the options object 
        //this first call is for trying to get an existing user
        axios.get('https://api.chatengine.io/users/me',{
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.id,
            }
        }).then(() => {
            //set the loading to false 
            setLoading(false);
        }).catch(() => {
            //this is the second call for not having a existing user 
            //so you have to create a new user
            let formData = new FormData();
            formData.append('email', user.email);
            formData.append('username', user.email);
            formData.append('secret', user.uid);
            //call function to get user image
            getFile(user.photoURL).then((avatar) => {
                formData.append('avatar', avatar, avatar.name);
                axios.post('https://api.chatengine.io/users/', formData, {headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_ID}}); 
            }).then(() => {
                setLoading(false); //if successful setloading to false
            }).catch((error) => console.log(error)); //if things did not go well console log error

        })
    }, [user,history]);
    if(!user || loading) return 'loading...';
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
                projectID="308b1035-04b6-42e7-af3a-088824226875"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );

};
export default Chats;