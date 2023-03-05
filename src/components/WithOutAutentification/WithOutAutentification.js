/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import style from './WithOutAutentification.module.scss';

export default function WithOutAuthentication() {
    const location = useLocation();
    const { pathname } = location;
    return (
        <ul className={style.btns}>
            <li>
                <Link
                    to='/sign-in'
                    className={
                        pathname === '/sign-in'
                            ? `${style.btn} ${style.active}`
                            : `${style.btn}`
                    }
                >
                    Sign In
                </Link>
            </li>
            <li>
                <Link
                    to='/sign-up'
                    className={
                        pathname === '/sign-up'
                            ? `${style.btn} ${style.active}`
                            : `${style.btn}`
                    }
                >
                    Sign Up
                </Link>
            </li>
        </ul>
    );
}
