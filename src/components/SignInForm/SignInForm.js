import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from '../../pages/Forms.module.scss';

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
        <section className={style.container}>
            <h5 className={style.title}>Sign In</h5>
            <form onSubmit={handleSubmit(onSubmit)} className={style.inputs}>
                <label htmlFor='email'>
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
                <label htmlFor='password'>
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
                <input
                    className={style.btn}
                    type='submit'
                    value='Login'
                    disabled={userError}
                />
                <span className={style.link}>
                    Don’t have an account?
                    <Link to='/sign-up'> Sign Up.</Link>
                </span>
            </form>
        </section>
    );
}
