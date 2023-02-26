import React from 'react';
import { Alert } from 'antd';

export default function WarningAlert(props) {
    const { handleClose, error } = props;
    let msg;
    if (error.email && error.username) {
        msg = 'Email and username are already taken';
    } else if (error.email) {
        msg = 'Email is already taken';
    } else if (error.username) {
        msg = 'Username is already taken';
    } else {
        msg = 'Email or password is invalid';
    }

    return (
        <Alert
            message={msg}
            type='warning'
            showIcon
            closable
            afterClose={handleClose}
        />
    );
}
