import React from 'react';
import UserService from '../../Service/userService'

import { Table, Modal, Button, message } from 'antd';
import UserContentForm from './components/userForm'
import './index.less'

export class HomeComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            selectedRowKeys: [],
            isVisible: false,
            userInfo: null,
        }
    }

    userForm = null;

    componentWillMount(){
        this.initUsers();
    }

    /**
     * 拉取用户
     */
    initUsers(){
        UserService.queryAllUser().then(res => {
            if(res.code === 200){
                this.setState({data: res.data})
            }
        })
    }

    /**
     * 绑定用户表单
     * @param {*} form 
     */
    onRefUserContent(form){
        this.userForm = form;
    }

    /**
     * 点击新增用户按钮呼出弹窗
     */
    addUser(){
        this.setState({
            isVisible: true,
            userInfo: {}
        })
    }

    /**
     * 点击编辑用户按钮呼出弹窗
     */
    editUser(item){
        this.setState({
            isVisible: true,
            userInfo: item
        })
    }

    /**
     * 删除用户
     * @param {*} item 
     */ 
    deleteUser(item){
        UserService.deleteUser(item).then(res => {
            if(res.code === 200){
                message.info("删除成功")
                this.handleCancel();
                this.initUsers()
            } else {
                message.error("删除失败")
            }
        })
    }

    /**
     * 新增或编辑用户
     */
    handleSubmit(){
        let { userInfo } = this.state;
        this.userForm.validateFields((err, values) => {
            if (!err) {
                let param = values;
                // 编辑
                if(userInfo && userInfo.id){
                    let newInfo = Object.assign(userInfo, values);
                    UserService.updateUser(newInfo).then(res => {
                        if(res.code === 200){
                            message.info("修改成功")
                            this.handleCancel();
                            this.initUsers()
                        } else {
                            message.error("修改失败")
                        }
                    })

                } else {
                // 新增
                    UserService.addUser(param).then(res => {
                        if(res.code === 200){
                            message.info("新增成功")
                            this.handleCancel();
                            this.initUsers()
                        } else {
                            message.error("新增失败")
                        }
                    })
                }
            
            }
        });
    }

    /**
     * 取消
     */
    handleCancel(){
        this.userForm && this.userForm.resetFields();
        this.setState({
            isVisible: false,
            userInfo: {},
        })
    }
    
    render(){
        let { data, selectedRowKeys, isVisible, userInfo } = this.state;
        let rowSelection = {
            selectedRowKeys,
            // onChange: this.onSelectChange,
            // onSelect: this.checkedAction.bind(this),
            // hideDefaultSelections: true,
        };
        const columns = [
            { 
                title: '序号', 
                width: '10%', 
                dataIndex: 'id',
                render : (text, record, index) => (
                    <span>
                        {index + 1}
                    </span>
                )
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },  {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
            }, {
                title: '城市',
                dataIndex: 'city',
                key: 'city',
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record, index) => (
                <span className='action'>
                    <span className="action-button" onClick={this.editUser.bind(this, record)}>编辑</span>
                    <span className="action-button" onClick={this.deleteUser.bind(this, record)}>删除</span>
                </span>
                ),
            }
        ];


        return(
            <div className="user-list">
                <div className="user-table">
                    <div className="user-header">
                        <Button
                            className="add-user"
                            type={"primary"}
                            icon={'plus'}
                            onClick={this.addUser.bind(this)}
                        >新增</Button>
                    </div>
                    <Table 
                        rowSelection={rowSelection}
                        rowKey={'id'}
                        columns={columns} 
                        dataSource={data} 
                    />
                </div>
                <div className="user-detail-message">
                    <Modal
                        title="编辑用户"
                        visible={isVisible}
                        onOk={this.handleSubmit.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        okText="确定"
                        cancelText="取消"
                        getContainer={() => document.querySelector('.user-detail-message')}
                    >
                       <UserContentForm
                            key={Math.random()}
                            userInfo={userInfo}
                            onRefUserContent={this.onRefUserContent.bind(this)}
                       >
                       </UserContentForm>
                    </Modal>
                </div>
            </div>
        )
    }
}

