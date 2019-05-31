
import React, { Component } from 'react'
import {Form, Row, Col, Input, Radio, Icon, Modal, Select } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;

class UserContent extends Component {
    constructor(props){
        super(props)
    }
    state = {
    }

    componentWillMount(){
    }

    componentDidMount(){
        let { form, userInfo } = this.props
        this.props.form.setFieldsValue({
            name: userInfo.name || '',
            username: userInfo.username || '',
            password: userInfo.password || '',
            phone: userInfo.phone || '',
            city: userInfo.city || ''
        })
        this.props.onRefUserContent && this.props.onRefUserContent(form)
    }

    render(){
        let { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            colon: true
        }

        return(
            <div className="add-edit-user">
                <Form className="add-edit-user-form">
                    <FormItem label="姓名" {...formItemLayout} className="name">
                        {getFieldDecorator('name', {
                            rules: [
                            ]
                        })(<Input
                            name="name"
                            type="text"
                            placeholder="请输入姓名"
                        />)}
                    </FormItem>
                    <FormItem label="用户名" {...formItemLayout} className="name">
                        {getFieldDecorator('username', {
                            rules: [
                            ]
                        })(<Input
                            name="username"
                            type="text"
                            placeholder="请输入用户名"
                        />)}
                    </FormItem>
                    <FormItem label="密码" {...formItemLayout} className="name">
                        {getFieldDecorator('password', {
                            rules: [
                            ]
                        })(<Input
                            name="password"
                            type="text"
                            placeholder="请输入密码"
                        />)}
                    </FormItem>
                    <FormItem label="手机号" {...formItemLayout} className="name">
                        {getFieldDecorator('phone', {
                            rules: [
                            ]
                        })(<Input
                            name="phone"
                            type="text"
                            placeholder="请输入手机号"
                        />)}
                    </FormItem>
                    <FormItem label="城市" {...formItemLayout} className="department">
                    {getFieldDecorator('city', {
                        rules: [
                        ]
                    })(<Input
                        name="city"
                        type="text"
                        placeholder="请输入城市"
                    />)}
                    </FormItem>

                    
                </Form>
            </div>
        )
    }
}

const UserContentForm = Form.create({
})(UserContent);

export default UserContentForm