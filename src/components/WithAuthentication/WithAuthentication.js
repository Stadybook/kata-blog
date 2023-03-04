import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import defaultPhoto from '../../img/avatar.svg';
import { accountLoginOut } from '../../redux/actions/userActions';
import { articleCreate } from '../../redux/actions/articleActions';

import style from './Authentification.module.scss';

export default function WithAuthentication() {
    const { sign } = useSelector((state) => state.signReducer);
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const image = user.image ? user.image : defaultPhoto;

    return (
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
}
