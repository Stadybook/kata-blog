/* eslint-disable no-unused-vars */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';

import getId from '../../helpFunctions/getId';

import style from './CreateArticle.module.scss';

const tags = [1, 2];
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

    const tagList = tags.map((tag) => {
        const id = getId();
        return (
            <li key={id} className={style.tag}>
                <label htmlFor={id}>
                    <input placeholder='tag' id={id} />
                </label>
                <Button danger>Delete</Button>
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
                <label htmlFor='Text'>
                    <span> Text</span>

                    <textarea
                        type='text'
                        className={errors?.title ? style.danger : null}
                        {...register('Text', {
                            required: 'This is required.',
                        })}
                        placeholder='Text'
                    />
                </label>
                <div className={style.tags}>
                    <span>Tags</span>
                    <div>
                        <ul>{tagList}</ul>
                        <button type='button'>Add tags</button>
                    </div>
                </div>

                <input className={style.btn} type='submit' value='Send' />
            </form>
        </section>
    );
}

export default withRouter(CreateArticle);
