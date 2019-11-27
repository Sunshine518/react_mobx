import React ,{Component}from 'react';
import Login from '../../components/Login/index';
import {inject} from "mobx-react/index";

@inject('appStore')
class ContainerLogin extends  Component{

    render(){
        return(
            <Login
                loginSuccess={this.props.appStore.loginSuccess}
                handleLogin={this.handleLogin}
            />
        )
    }

    handleLogin=(values)=>{
        const {appStore: {login}} = this.props
        login(values)
    };
}

export default ContainerLogin;
