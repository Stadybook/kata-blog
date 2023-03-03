import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ component: Component }) {
    const { user } = useSelector((state) => state.userReducer);
    return (
        <Route
            render={(props) =>
                user ? <Component {...props} /> : <Redirect to='/sign-in' />
            }
        />
    );
}
