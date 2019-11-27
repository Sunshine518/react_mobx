import React, {Component} from 'react';
import {inject,observer} from "mobx-react";
import BackendPage from './BackendPage'
import Modules from './backend'

const config = require(`@/project/config`).default

@inject('appStore')@observer
class Index extends Component {
    componentDidMount() {
        this.props.appStore.initSideMenu(config.REACT_APP_COMPANY.backend)
    }

    render() {
        const loginName = JSON.parse(localStorage.getItem('key')).loginName   //获取用户名
        return (
            <BackendPage
                leftMenu={this.props.appStore.leftMenu.slice()}
                modules={Modules}
                logout={this.props.appStore.logout}
                name={loginName}
            />
        );
    }
}

export default Index