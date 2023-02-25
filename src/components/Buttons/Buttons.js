/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popconfirm } from 'antd';

import { asyncDeleteArticles } from '../../redux/actions/actions';

import style from './Buttons.module.scss';

const text = 'Are you sure to delete this task?';
const description = 'Delete the task';

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
            <button type='button' className={style.edit} onClick={onEdit}>
                Edit
            </button>
        </div>
    );
}
