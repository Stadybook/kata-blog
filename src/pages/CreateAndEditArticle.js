import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Tag, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Error from '../components/ErrorHanding';
import {
    asyncAddArticle,
    asyncUpdateArticle,
} from '../redux/actions/articleActions';

import style from './Forms.module.scss';

const confirm = (msg) => {
    message.info(msg);
};

function CreateAndEditArticle(props) {
    const dispatch = useDispatch();
    const { edit } = props;

    const user = useSelector((state) => state.userReducer.user);
    const { token } = user;

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

        initValue = {
            title,
            description,
            body,
            tagList,
        };
    }

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
    const [tagValue, setTagValue] = useState('');

    const equelFunc = (array1, array2) => {
        const same =
            array1.length === array2.length &&
            array1.every((element, index) => {
                return element === array2[index];
            });
        return same;
    };

    const onSubmit = (data) => {
        if (
            data.title === initValue.title &&
            data.description === initValue.description &&
            data.body === initValue.body &&
            equelFunc(data.tagList, initValue.tagList)
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

    const onDelete = (tag) => {
        setTagList(listOfTags.filter((item) => item !== tag));
    };

    const onAddTag = () => {
        if (listOfTags.includes(tagValue)) {
            confirm('This tag already exists ');
            setTagValue('');
        } else {
            setTagList((list) => [...list, tagValue]);
            setTagValue('');
        }
    };

    const tags = listOfTags.map((tag) => {
        return (
            <li key={tag} className={style.tag}>
                <Tag>{tag}</Tag>
                <button
                    className={style.delete}
                    type='button'
                    onClick={() => onDelete(tag)}
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
                                    value={tagValue}
                                    placeholder='tag'
                                    onChange={(e) =>
                                        setTagValue(e.target.value)
                                    }
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
