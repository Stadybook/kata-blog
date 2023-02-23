/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    accountLogin,
    accountCreate,
    articleCreate,
    accountLoginOut,
} from '../../redux/actions/actions';
import defaultPhoto from '../../img/avatar.svg';

import style from './Header.module.scss';

export default function Header() {
    const sign = useSelector((state) => state.signReducer.sign);
    let user = useSelector((state) => state.userReducer.user);

    if (user === null) {
        user = sessionStorage.getItem('user');
        user = JSON.parse(user);
    }
    const dispatch = useDispatch();
    const withOutAuthentication = (
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

    const withAuthentication = (
        <ul className={style.btns}>
            <li>
                <Link
                    to='/new-article'
                    className={
                        sign === 'Create article'
                            ? `${style.btn} ${style.active}`
                            : `${style.btn}`
                    }
                    onClick={() => dispatch(articleCreate())}
                >
                    Create article
                </Link>
            </li>
            <li>
                <Link to='/profile'>
                    <div className={style.profile}>
                        <span>
                            {user !== null && user !== undefined
                                ? user.username
                                : ''}
                        </span>
                        <div className={style.avatar}>
                            <img
                                src={
                                    user !== null && user !== undefined
                                        ? user.image
                                        : defaultPhoto
                                }
                                alt='avatar'
                            />
                        </div>
                    </div>
                </Link>
            </li>
            <li>
                <Link
                    to='/sign-in'
                    className={
                        sign === 'Log Out'
                            ? `${style.btn} ${style.active}`
                            : `${style.btn}`
                    }
                    onClick={() => dispatch(accountLoginOut())}
                >
                    Log Out
                </Link>
            </li>
        </ul>
    );

    return (
        <header>
            <nav className={style.navigation}>
                <Link to='/articles/' className={style.title}>
                    Realworld Blog
                </Link>
                {user === null || user === undefined
                    ? withOutAuthentication
                    : withAuthentication}
            </nav>
        </header>
    );
}
