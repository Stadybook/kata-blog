/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

export default function Header() {
    return (
        <header>
            <h6 className={style.name}>Realworld Blog</h6>
            <div className={style.btns}>
                <Link to='/sign-in' className={style.btn}>
                    Sign In
                </Link>
                <Link to='/sign-up' className={`${style.btn} ${style.active}`}>
                    Sign Up
                </Link>
            </div>
        </header>
    );
}
