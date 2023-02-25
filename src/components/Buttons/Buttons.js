/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popconfirm } from 'antd';
import { Redirect, Link } from 'react-router-dom';

import { asyncDeleteArticles } from '../../redux/actions/actions';

import style from './Buttons.module.scss';

const text = 'Are you sure to delete this article?';
const description = 'Delete the article';

export default function Buttons() {
    const fullArticle = useSelector(
        (state) => state.articlesReducer.fullArticle
    );
    const user = useSelector((state) => state.userReducer.user);
    const { token } = user;
    const { slug } = fullArticle;
    const dispatch = useDispatch();

    const onDelete = () => {
        console.log('delete');
        dispatch(asyncDeleteArticles(slug, token));
    };

    const onEdit = () => {
        console.log('edit');
        // <Redirect to='/new-article' />;
    };

    return (
        <div className={style.group}>
            <Link to='/articles/'>
                <Popconfirm
                    placement='rightTop'
                    title={text}
                    description={description}
                    onConfirm={onDelete}
                    okText='Yes'
                    cancelText='No'
                >
                    <button type='button' className={style.delete}>
                        Delete
                    </button>
                </Popconfirm>
            </Link>
            <Link to='/new-article'>
                <button type='button' className={style.edit} onClick={onEdit}>
                    Edit
                </button>
            </Link>
        </div>
    );
}
