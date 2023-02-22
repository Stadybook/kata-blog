/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

export default function Header() {
    const sign = useSelector((state) => state.signReducer.sign);
    const dispatch = useDispatch();

    return (
        <header>
            <Link to='/articles/' className={style.title}>
                Realworld Blog
            </Link>
            <div className={style.btns}>
                <Link
                    to='/sign-in'
                    className={
                        sign === 'Sign In'
                            ? `${style.btn} ${style.active}`
                            : `${style.btn}`
                    }
                    onClick={() => dispatch({ type: 'signIn' })}
                >
                    Sign In
                </Link>
                <Link
                    to='/sign-up'
                    className={
                        sign === 'Sign Up'
                            ? `${style.btn} ${style.active}`
                            : `${style.btn}`
                    }
                    onClick={() => dispatch({ type: 'signUp' })}
                >
                    Sign Up
                </Link>
            </div>
        </header>
    );
}
