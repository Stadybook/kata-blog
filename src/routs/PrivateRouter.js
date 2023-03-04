import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component }) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return (
        <Route
            render={(props) =>
                user ? <Component {...props} /> : <Redirect to='/sign-in' />
            }
        />
    );
}
