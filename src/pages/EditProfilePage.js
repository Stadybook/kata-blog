/* eslint-disable func-names */
/* eslint-disable react-hooks/rules-of-hooks */

import { withRouter, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import WarningAlert from '../components/WarningAlert/WarningAlert';
import Spiner from '../components/Spiner/Spiner';
import { asyncEditProfile, makeLoad } from '../redux/actions/userActions';

import style from './Forms.module.scss';

const confirm = () => {
    message.info(
        'Incorrect url of the image. Please check the url or clear the input field'
    );
};

function EditProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const error = useSelector((state) => state.userReducer.userError);
    const userUpdate = useSelector((state) => state.userReducer.userUpdate);
    const loading = useSelector((state) => state.userReducer.load);

    const alert = error ? <WarningAlert error={error} /> : null;
    const spiner = loading && !error ? <Spiner /> : null;

    const { username, email, token } = user;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            username,
            email,
        },
    });

    const img = document.createElement('img');
    const url = watch('image');
    img.src = url;
    let msg;
    img.onload = function () {
        msg = true;
    };
    img.onerror = function () {
        msg = false;
    };

    const onSubmit = (data) => {
        if (msg || url === '') {
            dispatch(asyncEditProfile(data, token));
            dispatch(makeLoad());
            reset();
        } else {
            confirm();
        }
    };

    if (userUpdate !== null) {
        return <Redirect to='/articles/' />;
    }

    return (
        <>
            {alert}
            {spiner}
            <section className={style.container}>
                <h5 className={style.title}>Edit Profile</h5>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={style.inputs}
                >
                    <label htmlFor='username'>
                        <span> Username</span>
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
                        <span> Email address</span>
                        <input
                            type='email'
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
                        <span> New password</span>
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
                    <label htmlFor='image'>
                        <span> Avatar image (url)</span>
                        <input
                            placeholder='Avatar image'
                            {...register('image')}
                        />
                    </label>
                    <input
                        className={style.btn}
                        type='submit'
                        value='Save'
                        disabled={error}
                    />
                </form>
            </section>
        </>
    );
}

export default withRouter(EditProfilePage);
