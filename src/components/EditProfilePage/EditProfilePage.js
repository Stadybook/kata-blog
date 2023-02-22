/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import style from './EditProfilePage.module.scss';

function SignInPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = (data) => console.log(data);

    return (
        <section className={style.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5 className={style.title}>Edit Profile</h5>
                <div className={style.inputs}>
                    <label>
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
                    <label>
                        Email address
                        <input
                            className={errors?.email ? style.danger : null}
                            {...register('email', {
                                required: 'This is required.',
                                pattern: {
                                    value: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
                                    message: 'Invalid Email',
                                },
                            })}
                            placeholder='Email address'
                        />
                    </label>
                    <p>{errors?.email?.message}</p>
                    <label>
                        New password
                        <input
                            placeholder='Password'
                            {...register('password', {
                                required: 'This is required.',
                            })}
                        />
                    </label>
                    <label>
                        Avatar image (url)
                        <input
                            placeholder='Avatar image'
                            {...register('password', {})}
                        />
                    </label>
                </div>
                <input className={style.btn} type='submit' value='Save' />
            </form>
        </section>
    );
}

export default withRouter(SignInPage);
