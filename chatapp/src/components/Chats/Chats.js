import React from 'react';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../../firebase';

import { useAuth } from '../../contexts/AuthContext';

const Chats = () => {
    const history = useHistory();
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/'); //renavigate back to login form
    }
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