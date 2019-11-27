import React from 'react'
import {inject, observer} from 'mobx-react'
import {Switch} from 'react-router-dom'
import {Layout, Dropdown, Icon, Tooltip, Menu} from 'antd'
import {FormattedMessage, injectIntl} from 'react-intl'
import SideMenu from '../../../../components/FrontSideMenu/FrontSideMenu'
import frontend from '../frontend'
import css from './HomePage.module.less'
import ChangePassword from "../../../../components/ChangePasswordModal";

const headPortrait = require(`./imgs/headPortrait.jpg`)
const oneStep = require(`./imgs/logo1.png`)

const {Header, Content, Sider, Footer} = Layout

@injectIntl @inject('appStore', 'localeStore') @observer
class HomePage extends React.Component {

    render() {
        const value = JSON.parse(localStorage.getItem('key'));
        const {localeStore: {locale}} = this.props
        const userMenu = (
            <Menu>
                <Menu.Item style={{padding: '6px 12px'}}>
                    <div onClick={this.changePassword}><FormattedMessage id={'HomePage.password'}/></div>
                </Menu.Item>
                <Menu.Item style={{padding: '6px 12px'}}>
                    <div onClick={this.logout}><FormattedMessage id={'HomePage.logout'}/></div>
                </Menu.Item>
            </Menu>
        )

        const sideMenu = [
            {
                title: '前台模块A',
                url: `/home/${this.props.localeStore.locale.key}/modularA`,
                key: `/home/${this.props.localeStore.locale.key}/modularA`,
            },
            {
                title: '前台模块B',
                url: `/home/${this.props.localeStore.locale.key}/modularB`,
                key: `/home/${this.props.localeStore.locale.key}/modularB`,
            }
        ]

        return (
            <Layout>
                <Header className={css.header}>
                    <img src={oneStep} style={{width:180,float:'left',marginTop:5}}/>
                    <div className={css.menu}>
                        <span style={{fontSize: 15}}>
                            <span key={'zh'} onClick={() => this.handleSelectLanguage('zh')} style={{fontWeight:(locale.lang) === '中文' ? "bold" : "normal",cursor:'pointer'}}> 中文 </span>
                            /
                            <span key={'en'} onClick={() => this.handleSelectLanguage('en')} style={{fontWeight:(locale.lang) === 'English' ? "bold" : "normal",cursor:'pointer'}}> EN </span>
                        </span>
                        <Tooltip title={<FormattedMessage id={'HomePage.backend'}/>}>
                            <Icon type={'desktop'} style={{margin: '0 38px'}}
                                  onClick={() => {
                                      window.open('/main')
                                  }}/>
                        </Tooltip>
                        <Dropdown overlay={userMenu}>
                                <img src={headPortrait} style={{height:25,width:25,borderRadius:'50%'}} alt=""/>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Sider className={css.sider} width={208}>
                        <div style={{height:80,marginTop:20,marginBottom:20}}>
                            <div style={{height:60,width:60,margin:'0 auto'}}>
                                <img src={headPortrait} style={{height:'100%',width:'100%',borderRadius:'50%'}} alt=""/>
                            </div>
                            <div style={{textAlign:'center',marginTop:10}}>{value&&value.loginName}</div>
                        </div>
                        <SideMenu sideMenu={sideMenu}/>
                    </Sider>
                    <Layout>
                        <Content style={{padding: 24}}>
                            <Switch>{frontend} </Switch>
                        </Content>
                        <Footer style={{textAlign: 'center', marginLeft: -100}}>Copyright © <FormattedMessage id={'HomePage.foot'}/></Footer>
                    </Layout>
                </Layout>
                <ChangePassword/>
            </Layout>
        )
    }

    //选择语言
    handleSelectLanguage = (key) => {
        this.props.localeStore.changeLocale(key)
        this.props.history.push(`/home/${key}/modularA`)
    }

    //注销
    logout = () => {
        this.props.appStore.logout();
        this.props.history.push('/login')
    }

    //修改密码
    changePassword=()=>{
        this.props.appStore.changePassWord()
    }
}

export default HomePage
