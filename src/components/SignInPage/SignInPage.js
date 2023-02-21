/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Input, Form } from 'antd';

import style from './SignInPage.module.scss';

function SignInPage() {
    const onChange = (e) => {
        // console.log(e);
    };
    const onChecked = (e) => {
        // console.log(`checked = ${e.target.checked}`);
    };

    return (
        <section className={style.container}>
            <h5 className={style.title}>Sign In</h5>
            <div className={style.inputs}>
                <span>Email address</span>
                <Input
                    placeholder='Email address'
                    allowClear
                    onChange={onChange}
                />
                <span>Password</span>
                <Form.Item
                    name='password'
                    placeholder='Password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </div>
            <Button type='primary'>Login</Button>
            <span className={style.link}>
                Don’t have an account?
                <Link to='/sign-up'>Sign Up.</Link>
            </span>
        </section>
    );
}

export default withRouter(SignInPage);
