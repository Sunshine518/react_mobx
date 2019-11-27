import React from 'react'
import {Icon,message} from 'antd'
import {disabledChildBtn} from "../framework/utils/utils";

class MyButton extends React.Component{
    render(){
        return(
            <a className={this.props.className} onClick={this.onClick} style={{color:this.props.permission  ? 'rgba(0, 0, 0, 0.25)':'#096dd9' }} >
                <Icon type={this.props.icon} />
                {this.props.text}
            </a>
        )
    }

    onClick=(e)=>{
        if(this.props.permission){
            e.preventDefault()
            message.warning('无操作权限')
        }else{
            this.props.onClick()
        }

    }

//使用
// <MyButton className={'aToSpan'} permission ={disabledChildBtn('系统管理', '角色管理','addbtn')}
// onClick={()=>this.editModal(null)} text={'新增test'} icon={'plus'}>
// </MyButton>

}

export default MyButton