import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import WarningAlert from '../components/WarningAlert/WarningAlert';
import { asyncLogIn, makeLoad } from '../redux/actions/userActions';
import Spiner from '../components/Spiner/Spiner';

import style from './Forms.module.scss';

function SignInPage() {
    const user = useSelector((state) => state.userReducer.user);
    const error = useSelector((state) => state.userReducer.userError);
    const loading = useSelector((state) => state.userReducer.load);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    const alert = error && !error ? <WarningAlert error={error} /> : null;
    const spiner = loading && !error ? <Spiner /> : null;

    if (!user) {
        const onSubmit = (data) => {
            dispatch(makeLoad());
            dispatch(asyncLogIn(data));
            reset();
        };

        return (
            <>
                {alert}
                {spiner}
                <section className={style.container}>
                    <h5 className={style.title}>Sign In</h5>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={style.inputs}
                    >
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
                                className={
                                    errors?.password ? style.danger : null
                                }
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
                            disabled={error}
                        />
                        <span className={style.link}>
                            Don’t have an account?
                            <Link to='/sign-up'> Sign Up.</Link>
                        </span>
                    </form>
                </section>
            </>
        );
    }
    return <Redirect to='/articles/' />;
}

export default withRouter(SignInPage);

/*

import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import WarningAlert from '../WarningAlert/WarningAlert';
import { asyncLogIn } from '../../redux/actions/actions';

import style from './SignInPage.module.scss';

function SignInPage() {
    const user = useSelector((state) => state.userReducer.user);
    const error = useSelector((state) => state.userReducer.userError);
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
            dispatch(asyncLogIn(data));
            reset();
        };

        const alert = error ? (
            <WarningAlert error={error} />
        ) : (
            <section className={style.container}>
                <h5 className={style.title}>Sign In</h5>
                <form onSubmit={handleSubmit(onSubmit)} className={style.inputs}>
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

        return alert ;
    }
    return <Redirect to='/articles/' />;
}

export default withRouter(SignInPage);  */
