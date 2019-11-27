import React from 'react'
import PrivateRoute from '../../../framework/PrivateRoute'
import LoadableComponent from '../../../components/LoadableComponent'

export default [
    //前台页面路由
    <PrivateRoute key="home_modularA" exact path="/home/:locales/modularA" component={LoadableComponent(import('./ModularA'))}/>,
    <PrivateRoute key="home_modularB" exact path="/home/:locales/modularB" component={LoadableComponent(import('./ModularB'))}/>,
]