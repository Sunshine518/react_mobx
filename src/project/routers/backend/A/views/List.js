import {inject, observer} from "mobx-react/index"
import React, {Component} from 'react'

@inject('aStore')  @observer
class List extends Component {

    render() {
        return (
            <div>
               后台模块1
            </div>
        )
    }
}

export default List
