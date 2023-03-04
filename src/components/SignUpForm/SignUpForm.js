/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import InputSubmit from '../InputSubmit';

import style from './SignUpForm.module.scss';

export default function SignUpForm({ onSubmit, userError }) {
    SignUpForm.propTypes = {
        onSubmit: PropTypes.func.isRequired,
        userError: PropTypes.objectOf(PropTypes.string),
    };
    SignUpForm.defaultProps = {
        userError: null,
    };
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });
    return (
        <section className={style.container}>
            <h5 className={style.title}>Create new account</h5>
            <form onSubmit={handleSubmit(onSubmit)} className={style.inputs}>
                <label htmlFor='username'>
                    <span> Username</span>
                    <input
                        className={errors?.username ? style.danger : null}
                        {...register('username', {
                            required: 'This is required.',
                            pattern: {
                                value: /^[a-z][a-z0-9]*$/,
                                message:
                                    'You can only use lowercase English letters and numbers',
                            },
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
                    <span> Email address</span>
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
                <label htmlFor='password'>
                    <span> Password </span>
                    <input
                        type='password'
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
                    <span> Repeat Password </span>
                    <input
                        type='password'
                        className={errors?.passwordRepeat ? style.danger : null}
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
                <input
                    type='checkbox'
                    id='checkbox'
                    className={style.toggle}
                    {...register('checkbox', {
                        required: 'This is required.',
                    })}
                />
                <label htmlFor='checkbox' className={style.label}>
                    <span>
                        I agree to the processing of my personal information
                    </span>
                </label>
                <p>{errors.checkbox?.message}</p>
                <InputSubmit userError={userError} value='Create' />
                <span className={style.link}>
                    Already have an account?
                    <Link to='/sign-in'> Sign In.</Link>
                </span>
            </form>
        </section>
    );
}
