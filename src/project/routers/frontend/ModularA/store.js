import {observable,action} from 'mobx'

class modularAStore {
    @observable loading
    @observable formatMessage //国际化


    constructor() {
        this.loading = false
        this.formatMessage=()=>{}    //使用 this.formatMessage({id: 'xx.xxx'})
    }

    //将国际化保存到store
    @action
    saveFormatMessage=(formatMessage)=>{
        this.formatMessage=formatMessage
    }

}
export default new modularAStore()
