/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Alert } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { cleanUserError } from '../../redux/actions/userActions';

export default function WarningAlert(props) {
    WarningAlert.propTypes = {
        error: PropTypes.objectOf(PropTypes.string).isRequired,
    };
    const { error } = props;
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(cleanUserError());
    };

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
