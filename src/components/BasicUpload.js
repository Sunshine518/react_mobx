import { Upload, message, Button, Icon } from 'antd';
import React, { Component } from 'react'
import { isAuthenticated } from '../framework/utils/Session'

class BasicUpload extends Component {

    render(){
        const props = {
            name: 'file',
            action: this.props.url,
            headers: {
                'x-access-token': isAuthenticated(),
            },
            showUploadList:false,   //是否显示上传列表
            onChange:(info)=> {
                if (info.file.status === 'done') {
                    message.success(`文件上传成功`);
                    this.props.initPage()
                } else if (info.file.status === 'error') {
                    if(info.file.response.code>1000){
                        message.error(`文件上传失败（${info.file.response.msg}）`);
                    }
                    if(info.file.response.code>400&&info.file.response.code<1000){
                        message.error(`文件上传失败`);
                    }
                }
            }
        };
        return (
            <Upload {...props} >
                {
                    this.props.s==='button' ? <button disabled={this.props.disabled} className={'fnBtn'}><Icon type="download" /> 导入</button> :
                        (this.props.a ? <button className={'fnBtn'}>{this.props.a}</button> : <Button disabled={this.props.disables} ><Icon type="download" /> 导入</Button>)
                }
            </Upload>
        )}
}
export default BasicUpload
