import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import defaultPhoto from '../../img/avatar.svg';
import { accountLoginOut } from '../../redux/actions/userActions';

import style from './WithAuthentication.module.scss';

export default function WithAuthentication() {
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const location = useLocation();
    const { pathname } = location;
    const image = user.image ? user.image : defaultPhoto;

    return (
        <ul className={style.btns}>
            <li>
                <Link
                    to='/new-article'
                    className={
                        pathname === '/new-article'
                            ? `${style.btn} ${style.active}`
                            : `${style.btn}`
                    }
                >
                    Create article
                </Link>
            </li>
            <li>
                <Link to='/profile'>
                    <div className={style.profile}>
                        <span>{user.username}</span>
                        <div className={style.avatar}>
                            <img src={image} alt='avatar' />
                        </div>
                    </div>
                </Link>
            </li>
            <li>
                <Link
                    to='/sign-in'
                    className={style.btn}
                    onClick={() => dispatch(accountLoginOut())}
                >
                    Log Out
                </Link>
            </li>
        </ul>
    );
}
