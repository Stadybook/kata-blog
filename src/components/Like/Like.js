/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Like.scss';
import {
    asyncLikePost,
    asyncDislikePost,
} from '../../redux/actions/articleActions';

export default function Like(props) {
    const dispatch = useDispatch();
    const { favoritesCount, slug, favorited } = props;
    const user = useSelector((state) => state.userReducer.user);

    const [mark, setMark] = useState(favorited);
    const [count, setCount] = useState(favoritesCount);

    const onLike = () => {
        setMark(!mark);
        if (!mark) {
            setCount(count + 1);
            dispatch(asyncLikePost(slug, user.token));
        } else {
            setCount(count - 1);
            dispatch(asyncDislikePost(slug, user.token));
        }
    };
    return (
        <>
            <input
                type='checkbox'
                className='heart'
                onChange={onLike}
                id={slug}
                checked={mark}
                disabled={!user}
            />
            <label htmlFor={slug}>
                <span className='count'>{count}</span>
            </label>
        </>
    );
}