import { config } from './config'
let { api } = config;

export const user = {
    login: {
        value: `${api}login`,
        label: '登录',
    },

    addUser: {
        value: `${api}addUser`,
        label: '新增用户',
    },

    updateUser: {
        value: `${api}updateUser`,
        label: '编辑用户',
    },

    deleteUser: {
        value: `${api}deleteUser`,
        label: '删除用户',
    },
    
    queryAllUser: {
        value: `${api}users`,
        label: '查询所有用户',
    },
}