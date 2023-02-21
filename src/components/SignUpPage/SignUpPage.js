/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Input, Form, Checkbox, Typography } from 'antd';

import style from './SignUpPage.module.scss';

const { Paragraph, Text } = Typography;

function SignUpPage() {
    const onChange = (e) => {
        // console.log(e);
    };
    const onChecked = (e) => {
        // console.log(`checked = ${e.target.checked}`);
    };

    return (
        <section className={style.container}>
            <h5 className={style.title}>Create new account</h5>
            <div className={style.inputs}>
                <span>Username</span>
                <Input placeholder='Username' allowClear onChange={onChange} />
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
                <span>Repeat Password</span>
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
            <Checkbox onChange={onChecked}>
                I agree to the processing of my personal information
            </Checkbox>
            <Button type='primary'>Create</Button>
            <span className={style.link}>
                Already have an account?
                <Link to='/sign-in'>Sign In.</Link>
            </span>
        </section>
    );
}

export default withRouter(SignUpPage);
