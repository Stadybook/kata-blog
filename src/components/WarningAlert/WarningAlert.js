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

    const msg = 'Сlose this notification to continue';
    let warn;
    if (error.email && error.username) {
        warn = 'Email and username are already taken.';
    } else if (error.email) {
        warn = 'Email is already taken.';
    } else if (error.username) {
        warn = 'Username is already taken. ';
    } else {
        warn = 'Email or password is invalid.';
    }

    return (
        <Alert
            message={`${warn} ${msg}`}
            type='warning'
            showIcon
            closable
            afterClose={handleClose}
        />
    );
}
