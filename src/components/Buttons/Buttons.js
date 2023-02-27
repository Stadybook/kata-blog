/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popconfirm } from 'antd';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { asyncDeleteArticles } from '../../redux/actions/actions';

import style from './Buttons.module.scss';

const text = 'Are you sure to delete this article?';
const description = 'Delete the article';

export default function Buttons(props) {
    const history = useHistory();
    // const [action, setAction] = useState(false);
    const { onEdit } = props;
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
        history.push('/articles/');
    };

    return (
        <div className={style.group}>
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

            <button
                type='button'
                className={style.edit}
                onClick={() => onEdit(slug)}
            >
                Edit
            </button>
        </div>
    );
}
