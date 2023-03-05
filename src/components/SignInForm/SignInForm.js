/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FormTitle from '../FormTitle';
import InputSubmit from '../InputSubmit';
import Message from '../Message';

export default function SignInForm({ onSubmit, userError }) {
    SignInForm.propTypes = {
        onSubmit: PropTypes.func.isRequired,
        userError: PropTypes.objectOf(PropTypes.string),
    };
    SignInForm.defaultProps = {
        userError: null,
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    return (
        <>
            <FormTitle text='Sign In' />
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
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
                    Password
                </label>

                <input
                    type='password'
                    style={errors?.password ? { borderColor: '#F5222D' } : null}
                    placeholder='Password'
                    {...register('password', {
                        required: 'This is required.',
                    })}
                />

                <Message message={errors?.password?.message} />
                <InputSubmit value='Login' userError={userError} />
                <span
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        color: '#8C8C8C',
                        fontSize: 12,
                    }}
                >
                    Don’t have an account?
                    <Link to='/sign-up'> Sign Up.</Link>
                </span>
            </form>
        </>
    );
}
