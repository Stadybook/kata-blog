/* eslint-disable jsx-a11y/label-has-associated-control */

import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import InputSubmit from '../InputSubmit';
import Message from '../Message';
import FormTitle from '../FormTitle';

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
        <>
            <FormTitle text='Edit Profile' />
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
                <label style={{ fontSize: 14 }} htmlFor='username'>
                    Username
                </label>
                <input
                    style={errors?.username ? { borderColor: '#F5222D' } : null}
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

                <Message message={errors?.username?.message} />
                <label style={{ fontSize: 14 }} htmlFor='email'>
                    Email address
                </label>
                <input
                    type='email'
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
                    New password
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
                <label style={{ fontSize: 14 }} htmlFor='image'>
                    Avatar image (url)
                </label>

                <input
                    style={errors?.image ? { borderColor: '#F5222D' } : null}
                    placeholder='Avatar image'
                    {...register('image', {
                        pattern: {
                            value: /\.(jpeg|jpg|gif|png)$/,
                            message: 'Enter the correct URL',
                        },
                    })}
                />

                <Message message={errors?.image?.message} />
                <InputSubmit value='Save' userError={userError} />
            </form>
        </>
    );
}
