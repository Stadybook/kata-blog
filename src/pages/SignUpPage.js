import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spiner from '../components/Spiner';
import SignUpForm from '../components/SignUpForm';
import WarningAlert from '../components/WarningAlert';
import { asyncCreateUser, makeLoad } from '../redux/actions/userActions';

function SignUpPage() {
    const { user, userError, load } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const alert = userError ? <WarningAlert error={userError} /> : null;
    const spiner = load && !userError ? <Spiner /> : null;

    if (!user) {
        const onSubmit = (data) => {
            dispatch(asyncCreateUser(data));
            dispatch(makeLoad());
        };

        return (
            <>
                {alert}
                {spiner}
                <SignUpForm onSubmit={onSubmit} userError={userError} />
            </>
        );
    }
    return <Redirect to='/articles/' />;
}

export default withRouter(SignUpPage);
