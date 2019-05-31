import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox, message
  } from 'antd'

import './index.less'

import UserService from '../../Service/userService'


class Login extends React.Component{
    constructor(props){
        super(props)
    }

    /**
     * 登录提交
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let param = {
                    username: values.username,
                    password: values.password,
                }
                UserService.Login(param).then(res => {
                    if(res.code === 200){
                        message.info("登录成功！")
                        window.location.href = '/home';
                    } else {
                        message.error("用户名或密码错误")
                    }
                })

                console.log('Received values of form: ', values);
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        return(
            <div className="login-box">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            
        )
    }
}

const LoginForm = Form.create({})(Login);
export default LoginForm
