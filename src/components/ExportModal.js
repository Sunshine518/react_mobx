import React, {Component} from 'react'
import {Modal, Input,Upload, message} from "antd";
import {isAuthenticated} from '../framework/utils/Session'
import {getPattern} from '../framework/utils/utils'


class ExportModal extends Component {
    state = {
        fileList: [],
        uploading:false,
        fileName:''
    }

    handleCancel = (e) => {
        this.setState({
            fileList:[],
            fileName:''
        });
        this.props.cancel()
    }

    handleUpload = () => {
        const {fileList} = this.state;
        const formData = new FormData();
        if (!fileList.length) {
            message.warn('请选择上传文件');
            return
        }
        this.setState({
            uploading:false
        });
        fileList.forEach((file) => {
            formData.append('file', file.originFileObj);
        });
        this.setState({
            uploading:true
        })
        fetch(this.props.url, {
            method: 'POST',
            headers: {
                authorization: 'authorization-text',
                Accept: 'application/json',
                'x-access-token': isAuthenticated(),
            },
            processData: false,
            body: formData,
        }).then(response => response.json()).then((res) => {
            if (res.status) {
                message.success('文件上传成功');
            } else {
                if(res.code>1000){
                    message.error(`文件上传失败（${res.msg}）`);
                }
                if(res.code>400&&res.code<1000){
                    message.error(`文件上传失败`);
                }
            }
            this.setState({
                fileList: [],
                uploading: false,
                fileName:''
            });
            this.props.cancel()
            this.props.initPage()
        })
    }

    render(){
        const {fileList,uploading} = this.state;
        const props = {
            onChange: (info) => {
                if (info.file.status === "error") {
                    this.setState({
                        fileList:[],
                        fileName:''
                });
                }else{
                    let fileList = info.fileList;
                    fileList = fileList.slice(-1);
                    this.setState({fileList, fileName:fileList[0].name});
                }
            },

            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                        fileName:''
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                if (getPattern(file)){
                    return false
                }else {
                    message.warn("请上传正确格式的文件")
                    return true
                }
            },
            fileList,
        };

        return(
            <Modal
            title={this.props.title ? this.props.title : "导入"}
            visible={this.props.visible}
            onCancel={this.handleCancel}
            onOk={this.handleUpload}
            width={'30%'}
            confirmLoading={uploading}
            >
                <div style={{width:'90%',margin:'0 auto'}}>
                    <span style={{lineHeight:2.5}}>选择文件：</span><Input
                                placeholder="请添加文件..."
                                allowClear
                                onChange={this.onChange}
                                style={{width:'80%'}}
                                value={this.state.fileName}
                                addonAfter={
                                    <Upload showUploadList={false} {...props}>
                                        <div style={{cursor:'pointer'}}>上传附件</div>
                                    </Upload>}
                            />

                </div>
            </Modal>
        )
    }

   onChange = () => {
       this.setState({fileName:''})
    };
}
export default ExportModal
