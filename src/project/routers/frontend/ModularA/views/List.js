import React from 'react'
import {inject, observer} from "mobx-react";
import {Spin} from 'antd'
import {FormattedMessage, injectIntl} from 'react-intl'

@injectIntl @inject('modularAStore','localeStore')  @observer
class List extends React.Component{

    componentDidMount(){
        this.props.localeStore.changeLocale(this.props.match.params.locales)
    }

    componentDidUpdate(){
        this.props.modularAStore.saveFormatMessage(this.props.intl.formatMessage)
    }

    render(){
        const {intl: {formatMessage}}=this.props
        const {loading} =this.props.modularAStore

        return(
            <Spin spinning={loading}>
                <div>我是首页</div>
                <div>{formatMessage({id: 'news.welcome'})}</div>
                <FormattedMessage id={'HomePage.welcome'}/>
            </Spin>
        )
    }

}

export default List
