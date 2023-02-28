import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { accountLogin, accountCreate } from '../../redux/actions/userActions';

import style from './Authentification.module.scss';

export default function WithOutAuthentication() {
    const sign = useSelector((state) => state.signReducer.sign);

    const dispatch = useDispatch();
    return (
        <ul className={style.btns}>
            <li>
                <Link
                    to='/sign-in'
                    className={
                        sign === 'Sign In' || sign === 'Log Out'
                            ? `${style.btn} ${style.active}`
                            : `${style.btn}`
                    }
                    onClick={() => dispatch(accountLogin())}
                >
                    Sign In
                </Link>
            </li>
            <li>
                <Link
                    to='/sign-up'
                    className={
                        sign === 'Sign Up'
                            ? `${style.btn} ${style.active}`
                            : `${style.btn}`
                    }
                    onClick={() => dispatch(accountCreate())}
                >
                    Sign Up
                </Link>
            </li>
        </ul>
    );
}
