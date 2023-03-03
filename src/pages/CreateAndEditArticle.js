/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import arrCompare from '../helpFunctions/arrCompare';
import Tags from '../components/Tags';
import Error from '../components/Error';
import {
    asyncAddArticle,
    asyncUpdateArticle,
} from '../redux/actions/articleActions';

import style from './Forms.module.scss';

const confirm = (msg) => {
    message.info(msg);
};

function CreateAndEditArticle(props) {
    CreateAndEditArticle.propTypes = {
        edit: PropTypes.bool,
    };
    CreateAndEditArticle.defaultProps = {
        edit: false,
    };

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer);
    const { articleResponse, articleError, fullArticle } = useSelector(
        (state) => state.articlesReducer
    );

    const { token } = user;
    const { edit } = props;

    let initValue = { title: '', description: '', body: '', tagList: [] };

    if (fullArticle && edit) {
        const { title, description, body, tagList } = fullArticle;
        initValue = {
            title,
            description,
            body,
            tagList,
        };
    }
    const { title, description, body, tagList } = initValue;
    const [listOfTags, setTagList] = useState(tagList);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: initValue,
    });

    const onSubmit = (data) => {
        if (
            data.title === title &&
            data.description === description &&
            data.body === body &&
            arrCompare(listOfTags, tagList)
        ) {
            confirm('The data has not changed');
        } else {
            if (edit) {
                dispatch(
                    asyncUpdateArticle(
                        data,
                        fullArticle.slug,
                        token,
                        listOfTags
                    )
                );
            } else {
                dispatch(asyncAddArticle(data, token, listOfTags));
            }
            reset();
        }
    };

    if (articleResponse !== null || fullArticle === null) {
        return <Redirect to='/articles/' />;
    }

    return articleError ? (
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
                <Tags
                    confirm={confirm}
                    tagList={tagList}
                    showTags={setTagList}
                />
                <input className={style.btn} type='submit' value='Send' />
            </form>
        </section>
    );
}

export default withRouter(CreateAndEditArticle);
