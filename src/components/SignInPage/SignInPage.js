/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import { useForm } from 'react-hook-form';

import style from './SignInPage.module.scss';

function SignInPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = (data) => console.log(data);

    return (
        <section className={style.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5 className={style.title}>Sign In</h5>

                <div className={style.inputs}>
                    <label>
                        Email address
                        <input
                            className={errors?.email ? style.danger : null}
                            {...register('email', {
                                required: 'This is required.',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Invalid Email',
                                },
                            })}
                            placeholder='Email address'
                        />
                    </label>
                    <p>{errors?.email?.message}</p>
                    <label>
                        Password
                        <input
                            className={errors?.password ? style.danger : null}
                            placeholder='Password'
                            {...register('password', {
                                required: 'This is required.',
                            })}
                        />
                    </label>
                    <p>{errors?.password?.message}</p>
                </div>
                <input className={style.btn} type='submit' value='Login' />
                <span className={style.link}>
                    Don’t have an account?
                    <Link to='/sign-up'> Sign Up.</Link>
                </span>
            </form>
        </section>
    );
}

export default withRouter(SignInPage);
