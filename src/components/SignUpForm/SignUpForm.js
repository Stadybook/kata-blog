/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FormTitle from '../FormTitle';
import InputSubmit from '../InputSubmit';
import Message from '../Message';

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
        <>
            <FormTitle text='Create new account' />
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
                <label htmlFor='username' style={{ fontSize: 14 }}>
                    Username
                </label>
                <input
                    style={errors?.username ? { borderColor: '#F5222D' } : null}
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

                <Message message={errors?.username?.message} />
                <label style={{ fontSize: 14 }} htmlFor='email'>
                    Email address
                </label>
                <input
                    style={errors?.email ? { borderColor: '#F5222D' } : null}
                    {...register('email', {
                        required: 'This is required.',
                        pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: 'Invalid Email',
                        },
                    })}
                    placeholder='Email address'
                />

                <Message message={errors?.email?.message} />
                <label style={{ fontSize: 14 }} htmlFor='password'>
                    Password{' '}
                </label>
                <input
                    type='password'
                    style={errors?.password ? { borderColor: '#F5222D' } : null}
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

                <Message message={errors?.password?.message} />

                <label style={{ fontSize: 14 }} htmlFor='passwordRepeat'>
                    Repeat Password{' '}
                </label>

                <input
                    type='password'
                    style={
                        errors?.passwordRepeat
                            ? { borderColor: '#F5222D' }
                            : null
                    }
                    placeholder='Password'
                    {...register('passwordRepeat', {
                        required: 'This is required.',
                        validate: {
                            matchesPreviousPassword: (value) => {
                                const { password } = getValues();
                                return (
                                    password === value || 'Passwords must match'
                                );
                            },
                        },
                    })}
                />

                <Message message={errors?.passwordRepeat?.message} />
                <input
                    type='checkbox'
                    id='checkbox'
                    className={style.toggle}
                    {...register('checkbox', {
                        required: 'This is required.',
                    })}
                />
                <label
                    style={{ fontSize: 14 }}
                    htmlFor='checkbox'
                    className={style.label}
                >
                    I agree to the processing of my personal information
                </label>
                <Message message={errors.checkbox?.message} />
                <InputSubmit userError={userError} value='Create' />
                <span
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        color: '#8C8C8C',
                        fontSize: 12,
                    }}
                >
                    Already have an account?
                    <Link to='/sign-in'> Sign In.</Link>
                </span>
            </form>
        </>
    );
}
