import React from 'react'
import {inject, observer} from "mobx-react";
import {Spin} from 'antd'

@inject('modularBStore')  @observer
class List extends React.Component{

    componentDidMount(){
    }

    render(){
        const {loading} =this.props.modularBStore

        return(
            <Spin spinning={loading}>
                <div>我是B</div>
            </Spin>
        )
    }

}

export default List
