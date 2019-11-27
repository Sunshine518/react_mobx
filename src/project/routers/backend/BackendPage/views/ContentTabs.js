import React, {Component} from 'react';
import {Tabs,Icon} from 'antd';
import PropTypes from "prop-types";
import {withRouter, Route, Switch} from 'react-router-dom'
// import asyncComponent from '../../../../../components/AsyncComponent/AsyncComponent'   当后台需要单独加载页面时，引入组件
// const A = asyncComponent(() => import('../xx/a'));                                      在路由中加载A组件，

const {TabPane} = Tabs;

@withRouter
class ContentTabs extends Component {

    static propTypes = {
        modules: PropTypes.object.isRequired,
    }

    state = {
        activeKey: null,
        panes: [],
        isBack:false
    }

    componentWillReceiveProps(nextProps) {
        const newActiveKey = nextProps.activeKey
        if (newActiveKey !== this.state.activeKey) {
            this.changeActiveKey(newActiveKey,false)
            if (!this.state.panes.find(p => p.key === newActiveKey)) {
                const ContentComponent = nextProps.modules[newActiveKey]
                if (ContentComponent) {
                    const pane = {
                        title: ContentComponent.MODULE_NAME,
                        content: <ContentComponent tabPaneClose={()=>{this.remove(ContentComponent.MODULE_NAME)}}/>,
                        key: ContentComponent.MODULE_NAME
                    }
                    this.setState({
                        panes: [...this.state.panes, pane]
                    })
                }
            }
        }
    }

    // 在页面render--> switch 中引用A <Route path={'/main/xx/a'} component={A}/>
    render() {
        const bg = require('../images/login_BG.png')
        return (
            <Switch>
                <Route path={'/main'} render={() => {
                    return <div>
                        {
                            this.state.panes.length ?
                                <Tabs
                                    hideAdd
                                    onChange={this.onChange}
                                    activeKey={this.state.activeKey}
                                    type="editable-card"
                                    onEdit={this.onEdit}
                                    tabBarExtraContent={<div style={{marginRight:30,cursor: 'pointer'}}>
                                        {!this.state.isBack && <span style={{marginRight:16}} onClick={this.back}><Icon type="rollback" /> 返回</span>}
                                        <span onClick={this.closeAll}><Icon type="close-circle" /> 关闭全部</span>
                                    </div>}
                                >
                                    {this.state.panes.map(pane => (
                                        <TabPane tab={pane.title} key={pane.key}>
                                            {pane.content}
                                        </TabPane>
                                    ))}
                                </Tabs>
                                :
                                <div style={{
                                    backgroundImage: `url(${bg})`,
                                    width: '100%',
                                    height: ' 100%',
                                    backgroundSize: 'cover',
                                    position: 'absolute',
                                    left: 0,
                                    top: 0
                                }}/>
                        }
                    </div>
                }}/>
            </Switch>
        );
    }

     _history=[]

    //关闭全部
    closeAll=()=>{
        this.setState({
            panes:[],
            isBack:false
        })
        this._history=[]
    }

    changeActiveKey=(newActiveKey,isRollBack)=>{
        this.setState({
            activeKey: newActiveKey,
            isBack:false
        })
        if(!isRollBack && newActiveKey){
            this._history.push(newActiveKey)
        }
    }

    //返回
    back=()=>{
        if(this._history.length>1){
            this._history.pop()
            const newActiveKey= this._history[this._history.length-1]
            this.changeActiveKey(newActiveKey,true)
            this.setState({isBack:false})
        }
        if(this._history.length===1){
            this.setState({isBack:true})
        }
    }

    onChange = activeKey => {
        this.changeActiveKey(activeKey,false)
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };


    remove = targetKey => {
        this._history  = this._history.filter(item=>item !== targetKey)
        let {activeKey, panes} = this.state;
        const filterPanes = panes.filter(pane => pane.key !== targetKey);
        if (filterPanes.length > 0) {
            if (targetKey === activeKey) {
                const targetIndex = panes.findIndex(p => p.key === targetKey)
                const willActiveIndex = (targetIndex === 0) ? 1 : targetIndex - 1
                const willActiveKey = panes[willActiveIndex].key
                this.setState({
                    activeKey: willActiveKey
                })
            }
        } else {
            this.setState({
                activeKey: null
            })
        }
        this.setState({
            panes: filterPanes
        })

    };


}

export default ContentTabs
