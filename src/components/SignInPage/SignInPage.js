/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { asyncLodIn } from '../../redux/actions/actions';

import style from './SignInPage.module.scss';

function SignInPage() {
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    if (user === undefined || user === null) {
        const onSubmit = (data) => {
            dispatch(asyncLodIn(data));
            reset();
        };

        return (
            <section className={style.container}>
                <h5 className={style.title}>Sign In</h5>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={style.inputs}
                >
                    <label>
                        <span>Email address</span>
                        <input
                            className={errors?.email ? style.danger : null}
                            {...register('email', {
                                required: 'This is required.',
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: 'Invalid Email',
                                },
                            })}
                            placeholder='Email address'
                        />
                    </label>
                    <p>{errors?.email?.message}</p>
                    <label>
                        <span> Password</span>
                        <input
                            type='password'
                            className={errors?.password ? style.danger : null}
                            placeholder='Password'
                            {...register('password', {
                                required: 'This is required.',
                            })}
                        />
                    </label>
                    <p>{errors?.password?.message}</p>
                    <input className={style.btn} type='submit' value='Login' />
                    <span className={style.link}>
                        Don’t have an account?
                        <Link to='/sign-up'> Sign Up.</Link>
                    </span>
                </form>
            </section>
        );
    }
    return <Redirect to='/articles/' />;
}

export default withRouter(SignInPage);
