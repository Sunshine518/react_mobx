import React, {Component} from 'react';
import { Link} from 'react-router-dom'
import { Layout, Icon,Menu } from 'antd';
import SiderMenu from './views/SiderMenu'
import ContentTabs from './views/ContentTabs'
import PropTypes from "prop-types";
import './index.css'
import TabContext from './context'

const { Header, Sider, Content } = Layout;
const {SubMenu, Item} = Menu


class Index extends Component {

    static propTypes = {
        logo: PropTypes.string,
        leftMenu:PropTypes.array,
        modules:PropTypes.object
    }
    static defaultProps = {
        logo: require('./images/logo.png'),
        leftMenu:[],
        modules:undefined
    }
    state = {
        collapsed: false,
    };


changeActiveKey=(activeKey)=>{
    this.setState({activeKey:activeKey})
}


    render() {
        return (
            <TabContext.Provider  value={{activeKey:this.state.activeKey,changeActiveKey:this.changeActiveKey}}>
            <Layout style={{minHeight:'700px',minWidth:'800px',height:'100vh'}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{overflow:'auto'}}>
                    <div className="logo">
                        <img src={this.props.logo} style={{width:'90%',height:'100%'}}/>
                    </div>
                    <SiderMenu menus={this.props.leftMenu} click={this.siderMenuClick}/>
                </Sider>
                <Layout>
                    <Header className='header'>
                        <Icon className="menuFold" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/>
                        <Menu className="header-menu" mode="horizontal">
                            <SubMenu style={{float: 'right'}}
                                     title={<span><Icon type="user"/>{this.props.name}</span>}>
                                <Menu.Item key="userInfo">
                                    <Link to={'/'}><Icon type="bell"/>进入前台</Link>
                                </Menu.Item>
                                <Menu.Divider/>
                                <Menu.Item key="logout">
                                    <a onClick={this.props.logout}><Icon type="logout"/>注销</a>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Header>
                    <Content style={{position: 'relative'}}>
                        <ContentTabs activeKey={this.state.activeKey}
                                     modules={this.props.modules}
                        />
                    </Content>
                </Layout>
            </Layout>
            </TabContext.Provider>
        );
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    siderMenuClick=({item, key, keyPath})=>{
        this.setState({
            activeKey:key
        })
    }

}

export default Index;
