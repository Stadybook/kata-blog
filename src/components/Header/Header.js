import React from 'react';

import style from './Header.module.scss';

export default function Header() {
    return (
        <header>
            <h6 className={style.name}>Realworld Blog</h6>
            <div className={style.btns}>
                <button type='button' className={style.btn}>
                    Sign In
                </button>
                <button
                    type='button'
                    className={`${style.btn} ${style.active}`}
                >
                    Sign Up
                </button>
            </div>
        </header>
    );
}
