/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Error from '../components/ErrorHanding';
import {
    asyncAddArticle,
    asyncUpdateArticle,
} from '../redux/actions/articleActions';
import getId from '../helpFunctions/getId';

import style from './Forms.module.scss';

function CreateAndEditArticle(props) {
    const dispatch = useDispatch();
    const { edit } = props;
    const user = useSelector((state) => state.userReducer.user);
    const fullArticle = useSelector(
        (state) => state.articlesReducer.fullArticle
    );
    const articleResponse = useSelector(
        (state) => state.articlesReducer.articleResponse
    );
    const error = useSelector((state) => state.articlesReducer.articleError);

    let initValue = { title: '', description: '', body: '', tagList: [] };

    if (fullArticle && edit) {
        const { title, description, body, tagList } = fullArticle;

        const getData = (arrArrs) => {
            return arrArrs.map((val) => ({ name: val, id: getId() }));
        };
        const newTagList = getData(tagList);

        initValue = {
            title,
            description,
            body,
            tagList: newTagList,
        };
    }

    if (user === undefined || user === null) {
        return <Redirect to='/sign-in' />;
    }

    const { token } = user;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: initValue,
    });

    const [listOfTags, setTagList] = useState(initValue.tagList);
    const [tagValue, setTagValue] = useState({ name: '', id: '' });

    const onSubmit = (data) => {
        const tagsArr = [];
        listOfTags.map((el) => {
            tagsArr.push(el.name);
        });
        if (edit) {
            dispatch(
                asyncUpdateArticle(data, fullArticle.slug, token, tagsArr)
            );
        } else {
            dispatch(asyncAddArticle(data, token, tagsArr));
        }
        reset();
    };

    const onDelete = (id) => {
        const index = listOfTags.findIndex((el) => el.id === id);
        const newData = [
            ...listOfTags.slice(0, index),
            ...listOfTags.slice(index + 1),
        ];
        setTagList(newData);
    };

    const onAddTag = () => {
        setTagList((list) => [...list, tagValue]);
        setTagValue({ name: '', id: '' });
    };

    const onChange = (name) => {
        const id = getId();
        const newTag = {
            name,
            id,
        };
        setTagValue(newTag);
    };

    const tags = listOfTags.map((tag) => {
        const { id } = tag;
        return (
            <li key={tag.id} className={style.tag}>
                <Tag>{tag.name}</Tag>
                <button
                    className={style.delete}
                    type='button'
                    onClick={() => onDelete(id)}
                >
                    Delete
                </button>
            </li>
        );
    });

    if (articleResponse !== null) {
        return <Redirect to='/articles/' />;
    }

    return error ? (
        <Error />
    ) : (
        <section className={`${style.container} ${style.lg}`}>
            <h5 className={style.title}>Create new article</h5>
            <form onSubmit={handleSubmit(onSubmit)} className={style.inputs}>
                <label htmlFor='title'>
                    <span>Title</span>
                    <input
                        type='text'
                        className={errors?.title ? style.danger : null}
                        {...register('title', {
                            required: 'This is required.',
                        })}
                        placeholder='Title'
                    />
                </label>
                <p>{errors?.title?.message}</p>
                <label htmlFor='description'>
                    <span> Short description</span>
                    <input
                        type='text'
                        className={errors?.title ? style.danger : null}
                        {...register('description', {
                            required: 'This is required.',
                        })}
                        placeholder='Short description'
                    />
                </label>
                <p>{errors?.description?.message}</p>
                <label htmlFor='body'>
                    <span> Text</span>
                    <textarea
                        type='text'
                        className={errors?.title ? style.danger : null}
                        {...register('body', {
                            required: 'This is required.',
                        })}
                        placeholder='Text'
                    />
                </label>
                <p>{errors?.text?.message}</p>
                <div className={style.tags}>
                    <span>Tags</span>
                    <div className={style.tags__list}>
                        <ul>{tags}</ul>
                        <div>
                            <label htmlFor='tag'>
                                <input
                                    {...register('tag', {
                                        required: false,
                                        pattern: {
                                            value: /^[a-zA-Z0-9]+$/,
                                            message:
                                                'You can use only english letters and digits without spaces and other symbols',
                                        },
                                    })}
                                    value={tagValue.name}
                                    placeholder='tag'
                                    onChange={(e) => onChange(e.target.value)}
                                />
                            </label>
                            <button
                                className={style.add}
                                type='button'
                                onClick={onAddTag}
                            >
                                Add tags
                            </button>
                        </div>
                    </div>
                </div>

                <input className={style.btn} type='submit' value='Send' />
            </form>
        </section>
    );
}

export default withRouter(CreateAndEditArticle);
