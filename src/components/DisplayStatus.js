import React from 'react';

function DisplayStatus({ type, message }) {
    return (
        <div className={`statusMessage ${type}`}>
            <p>{message}</p>
        </div>
    );
}

export default DisplayStatus;
