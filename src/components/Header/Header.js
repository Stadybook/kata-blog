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
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();

    const withOutAuthentication = (
        <div className={style.btns}>
            <Link
                to='/sign-in'
                className={
                    sign === 'Sign In'
                        ? `${style.btn} ${style.active}`
                        : `${style.btn}`
                }
                onClick={() => dispatch(accountLogin())}
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
                onClick={() => dispatch(accountCreate())}
            >
                Sign Up
            </Link>
        </div>
    );

    const withAuthentication = (
        <div className={style.btns}>
            <Link
                to='/'
                className={
                    sign === 'Create article'
                        ? `${style.btn} ${style.active}`
                        : `${style.btn}`
                }
                onClick={() => dispatch(articleCreate())}
            >
                Create article
            </Link>
            <Link to='/profile'>
                <div className={style.profile}>
                    <span>Name</span>
                    <div className={style.avatar}>
                        <img src={defaultPhoto} alt='avatar' />
                    </div>
                </div>
            </Link>
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
        </div>
    );

    return (
        <header>
            <Link to='/articles/' className={style.title}>
                Realworld Blog
            </Link>
            {user === null ? withOutAuthentication : withAuthentication}
        </header>
    );
}
