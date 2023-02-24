/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Tag } from 'antd';

import getId from '../../helpFunctions/getId';

import style from './CreateArticle.module.scss';

function CreateArticle() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = (data) => {
        console.log(data);
        // dispatch(asyncEditProfile(data, token));
        reset();
    };

    const [tagList, setTagList] = useState([]);
    const [tagValue, setTagValue] = useState({ name: '', id: '' });

    const onDelete = (id) => {
        const index = tagList.findIndex((el) => el.id === id);
        const newData = [
            ...tagList.slice(0, index),
            ...tagList.slice(index + 1),
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

    const tags = tagList.map((tag) => {
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

    return (
        <section className={style.container}>
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
                <label htmlFor='text'>
                    <span> Text</span>
                    <textarea
                        type='text'
                        className={errors?.title ? style.danger : null}
                        {...register('text', {
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

export default withRouter(CreateArticle);
