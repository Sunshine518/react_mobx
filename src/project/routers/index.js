import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '../../framework/PrivateRoute'
import LoadableComponent from '../../components/LoadableComponent'

export default [
  //  不属于前后台组合，单独分离的页面路由
  <PrivateRoute key="frontend_index" exact path="/" component={LoadableComponent(import('./frontend/DefaultPage'))}/>,            //默认显示页面
  <Route key="frontend_login" exact path="/login" component={LoadableComponent(import('../Login'))}/>,                   //登录组件
  <PrivateRoute key="front_backend" path="/main" component={LoadableComponent(import('./backend/index'))}/>,              //后台组件
  <PrivateRoute key="front_home" path="/home" component={LoadableComponent(import('./frontend/HomePage'))}/>,                //前台组件
]