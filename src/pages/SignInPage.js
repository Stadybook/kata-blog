/* eslint-disable no-unused-vars */
import { withRouter, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import WarningAlert from '../components/WarningAlert';
import { asyncLogIn, makeLoad } from '../redux/actions/userActions';
import Spiner from '../components/Spiner';

import style from './Forms.module.scss';

function SignInPage() {
    const { user, userError, load } = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    const alert = userError ? <WarningAlert error={userError} /> : null;
    const spiner = load && !userError ? <Spiner /> : null;

    if (!user) {
        const onSubmit = (data) => {
            dispatch(makeLoad());
            dispatch(asyncLogIn(data));
            // reset();
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
                            disabled={userError}
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
