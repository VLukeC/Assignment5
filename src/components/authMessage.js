import React, { useContext } from 'react';
import DisplayStatus from './DisplayStatus';
import { AuthContext } from './LoginForm';



function AuthMessage() {
    const { username, password, loginStatus, error } = useContext(AuthContext);
    if (loginStatus === null) {
        return null;
    }

    if (loginStatus) {
        return (
            <DisplayStatus 
                type="success" 
                message={`Welcome, ${username}! Redirecting...`} 
            />
        );
    }

    return (
        <DisplayStatus 
            type="error" 
            message={error} 
        />
    );
}

export default AuthMessage;
