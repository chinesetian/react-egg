import { httpRequest } from '../Utils/HttpUtil'
import { user } from './url'


@httpRequest

class UserService {

    Login(options) {
        return this.$httpRequest({
            url: user.login.value,
            method: 'post',
            data: options
        })
    }

    Logout(options) {
        return this.$httpRequest({
            method: 'post'
        })
    }

    addUser(options){
        return this.$httpRequest({
            url: user.addUser.value,
            method: 'post',
            data: options,
        })
    }

    updateUser(options){
        return this.$httpRequest({
            url: user.updateUser.value,
            method: 'post',
            data: options,
        })
    }

    deleteUser(options){
        return this.$httpRequest({
            url: user.deleteUser.value,
            method: 'post',
            data: options,
        })
    }

    queryAllUser(options){
        return this.$httpRequest({
            url: user.queryAllUser.value,
            method: 'get',
        })
    }
}

export default new UserService()