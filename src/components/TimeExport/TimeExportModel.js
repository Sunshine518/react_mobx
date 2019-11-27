import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Modal, DatePicker} from 'antd'
import './style.css'
import moment from "moment/moment";

const {RangePicker} = DatePicker;

 @observer
class ExcelModel extends Component {
    state = {
        times:[],
        endOpen: false
    };

    handleOnChanges=(value)=> {
        this.setState({
            times:value
        })
    }

    render() {
        const {visible} = this.props
        return (
            <Modal title={'导出'}
                   visible={visible}
                   onCancel={this.handleClose}
                   onOk={this.onOk}
                   width={500}
            >
                <div style={{ marginLeft:40}}>
                    <div style={{marginBottom:16}}>
                        起止时间：<RangePicker style={{width: '240'}} showTime format={'YYYY-MM-DD'} onChange={this.handleOnChanges} value={this.state.times}/>
                    </div>
                </div>
            </Modal>
        )
    }

    onOk = () => {
        const beginTime=moment(this.state.times[0]).format("YYYY-MM-DD")
        const endTime=moment(this.state.times[1]).format("YYYY-MM-DD")
        window.location.href = this.props.url + `?search.${this.props.startTime ? this.props.startTime : 'beginTime'}=${beginTime}&search.endTime=${endTime}`
        this.handleClose()
    }

    //点击x时隐藏导出弹出层
    handleClose = () => {
        this.props.cancel()
        this.setState({
            endOpen: false,
            times:[]
        })
    }
}

export default ExcelModel