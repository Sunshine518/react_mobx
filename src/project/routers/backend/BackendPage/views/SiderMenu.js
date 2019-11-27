import React, {Component} from 'react';
import {Icon, Menu} from 'antd';
import PropTypes from "prop-types";

const Item = Menu.Item
const SubMenu = Menu.SubMenu

class SiderMenu extends Component {
    state = {
        current: '',
    };

    static propTypes = {
        click: PropTypes.func.isRequired,
        menus: PropTypes.array,
    }

    static defaultProps = {
        click: () => {
        },
        menus: []
    }


    render() {
        return (
            <Menu theme="dark" mode="inline"  onClick={this.menuClick} selectedKeys={[this.state.current]}>
                {this._MenuItem(this.props.menus)}
            </Menu>

        );
    }


    _MenuItem = (arr) => {
        return arr.map(item => {
            if (item.leaf) {
                return (
                    <Item key={item.name}>
                        <div>{item.icon && <Icon type={item.icon}/>}<span>{item.name}</span></div>
                    </Item>
                )
            } else {
                return (
                    <SubMenu key={item.name} title={<span>{item.icon && <Icon type={item.icon}/>}{item.name}</span>}>
                        {this._MenuItem(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    menuClick = ({item, key, keyPath}) => {
        this.setState({
            current:key,
        });
        this.props.click({item, key, keyPath})
    }
}

export default SiderMenu