import {observable,action} from 'mobx'

class modularBStore {
    @observable loading

    constructor() {
        this.loading = false

    }

}
export default new modularBStore()
