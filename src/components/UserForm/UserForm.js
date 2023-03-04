/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import InputSubmit from '../InputSubmit';

import style from './UserForm.module.scss';

export default function UserForm({ onSubmit, email, username, userError }) {
    UserForm.propTypes = {
        onSubmit: PropTypes.func.isRequired,
        userError: PropTypes.objectOf(PropTypes.string),
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    };
    UserForm.defaultProps = {
        userError: null,
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            username,
            email,
        },
    });

    return (
        <section className={style.container}>
            <h5 className={style.title}>Edit Profile</h5>
            <form onSubmit={handleSubmit(onSubmit)} className={style.inputs}>
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
                        {...register('image', {
                            pattern: {
                                value: /\.(jpeg|jpg|gif|png)$/,
                                message: 'Enter the correct URL',
                            },
                        })}
                    />
                </label>
                <p>{errors?.image?.message}</p>
                <InputSubmit value='Save' userError={userError} />
            </form>
        </section>
    );
}
