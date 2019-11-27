import {action, runInAction,observable} from 'mobx'
import {notification, message} from 'antd'
import {json, get} from '../framework/utils/ajax'
import * as Session from '../framework/utils/Session'
import history from '../framework/customHistory'
import {setStore} from '../framework/utils/utils'
import localeStore from './LocaleStore'
const config = require(`@/project/config`).default

class AppStore {
    @observable loading
    @observable isLogin  //当前用户登录状态
    @observable changePassWordVisible  //显示修改密码模态框属性
    @observable userId  //保存用户ID,修改用户传入后台
    @observable passWordField  //修改密码表单值绑定
    @observable confirmLoading //修改密码确认loading
    @observable formatMessage  //国际化
    @observable userInfo
    @observable leftMenu   //侧边栏列表数据

    constructor() {
        this.loading = false
        this.isLogin = false
        this.changePassWordVisible = false
        this.userId = ''
        this.passWordField = {
            oldPassword:{},
            password:{},
            passwordConfirm: {}
        }
        this.confirmLoading = false
        this.formatMessage=()=>{}
        this.userInfo = {}
        this.leftMenu=[]

    }

    @action
    setStore = (obj) => {
        setStore(obj, this)
    }

    /**登录成功*/
    loginSuccess = async (res) => {
        Session.authenticateSuccess(res.token)
        if(res.permissions===1){
            history.push(`/main`)
        }else{
            history.push(`/home/${localeStore.locale.key}/modularA`)
        }
        runInAction(() => {
            this.isLogin = true
            this.userInfo=res
        })
    }


    /****修改密码绑定表单值***/
    @action
    passWordFieldChange = (changeFields) => {
        this.passWordField = {...this.passWordField, ...changeFields}
    }

    /***密码修改保存***/
    @action
    saveChangePassWord = async () => {
        this.userId=JSON.parse(localStorage.getItem('key')).id
        this.confirmLoading = true
        let passWordField=this.passWordField.password.value
        let oldPassword=this.passWordField.oldPassword.value
        const res = await json.put(`/user:updatePassword/${this.userId}?password=${passWordField}&oldPassword=${oldPassword}`)
        runInAction(() => {
            if (res.status) {
                message.success(this.formatMessage({id: 'forceChangePassword.success'}))
                this.confirmLoading = false
                this.cancelChangePassWord()
            } else {
                this.confirmLoading = false
            }
        })
    }

    /**退出登录**/
    @action
    logout = async () => {
        try {
            await get(`logout`)
            Session.logout()
            sessionStorage.clear()
            localStorage.removeItem('key');
            history.push('/login')
            runInAction(() => {
                this.isLogin = false
            })
        } catch (e) {
            notification.error({
                message: 'error',
                description: e.message
            })
        }
    }

    /**显示修改密码弹框**/
    @action
    changePassWord=()=>{
        this.changePassWordVisible=true
    }

    /**关闭密码弹框**/
    @action
    cancelChangePassWord=()=>{
        this.changePassWordVisible=false
        this.passWordField = {
            oldPassword: {},
            password:{},
            passwordConfirm: {}
        }
    }

    //获取后台菜单
    @action
    initSideMenu = async (platformId) => {
        try {
            const res = await json.get(`Menu/platformId/${platformId}`)
            if (res.status === 0) {
                notification.error({message: res.code, description: res.msg})
            } else {
                runInAction(() => {
                    this.leftMenu = res.data
                    this.leftMenu = this.findChildrenType({children: res.data})                //如果需要将权限做到按钮权限，需要应该到findChildrenType方法
                })
            }
        } catch (err) {
            notification.error({
                message: 'error',
                description: err.message
            })
        }
    }

    //遍历数组,判断当前元素类型是否为btn,btn类型的不显示在菜单中
    @action
    findChildrenType = (tree) => {
        if (tree.children && tree.children.length > 0) {
            let arr = tree.children.filter(i => i.type !== 'btn')
            if(arr.length>0){
                arr.forEach(i => i.children = this.findChildrenType(i))
            }else {
                tree.leaf=true
            }
            return arr
        }
        return null
    }

}

export default new AppStore()