/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Checkbox } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { asyncCreateUser } from '../../redux/actions/actions';

import style from './SignUpPage.module.scss';

function SignUpPage() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(asyncCreateUser(data));
    };

    return (
        <section className={style.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5 className={style.title}>Create new account</h5>
                <div className={style.inputs}>
                    <label htmlFor='username'>
                        Username
                        <input
                            className={errors?.username ? style.danger : null}
                            {...register('username', {
                                required: 'This is required.',
                                pattern: /^[a-zA-Z0-9]+$/,
                                minLength: {
                                    value: 3,
                                    message:
                                        'Your username needs to be at least 3 characters.',
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        'Your username needs to be no more than 20 characters.',
                                },
                            })}
                            placeholder='Username'
                        />
                    </label>
                    <p>{errors?.username?.message}</p>
                    <label htmlFor='email'>
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
                    <label htmlFor='password'>
                        Password
                        <input
                            className={errors?.password ? style.danger : null}
                            placeholder='Password'
                            {...register('password', {
                                required: 'This is required.',
                                minLength: {
                                    value: 6,
                                    message:
                                        'Your password needs to be at least 6 characters.',
                                },
                                maxLength: {
                                    value: 40,
                                    message:
                                        'Your password needs to be no more than 40 characters.',
                                },
                            })}
                        />
                    </label>

                    <p>{errors?.password?.message}</p>

                    <label htmlFor='passwordRepeat'>
                        Repeat Password
                        <input
                            className={
                                errors?.passwordRepeat ? style.danger : null
                            }
                            placeholder='Password'
                            {...register('passwordRepeat', {
                                required: 'This is required.',
                                validate: {
                                    matchesPreviousPassword: (value) => {
                                        const { password } = getValues();
                                        return (
                                            password === value ||
                                            'Passwords must match'
                                        );
                                    },
                                },
                            })}
                        />
                    </label>
                    <p>{errors?.passwordRepeat?.message}</p>
                </div>
                <Checkbox
                    {...register('checkbox', {
                        required: 'This is required.',
                    })}
                >
                    I agree to the processing of my personal information
                </Checkbox>
                <p>{errors.checkbox?.message}</p>
                <input className={style.btn} type='submit' value='Create' />
                <p className={style.link}>
                    Already have an account?
                    <Link to='/sign-in'> Sign In.</Link>
                </p>
            </form>
        </section>
    );
}

export default withRouter(SignUpPage);

/* <label htmlFor='checkbox'>
     I agree to the processing of my personal information
</label> */
