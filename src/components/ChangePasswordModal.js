import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {Modal, Form, Input, Button} from 'antd'
import {FormattedMessage, injectIntl, intlShape} from "react-intl";
import {createFormItemObjError} from "../framework/utils/utils";

const form = Form.create({
    onFieldsChange(props, changedFields) {
        props.appStore.passWordFieldChange(changedFields)
    },
    mapPropsToFields(props) {
        return createFormItemObjError(props.appStore.passWordField)
    }
})

@injectIntl @inject('appStore') @form @observer
class ChangePassword extends Component {
    static propTypes = {
        intl: intlShape.isRequired,
    }


    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    }


    render() {
        const {intl: {formatMessage}} = this.props   //语言国际化
        const {changePassWordVisible, confirmLoading} = this.props.appStore
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 14},
        }

        return (
            <Modal title={<FormattedMessage id={'forceChangePassword.title'}/>}
                   visible={changePassWordVisible}
                   onCancel={this.handleCancel}
                   footer={
                       <div>
                          <Button onClick={this.handleCancel}><FormattedMessage id={'geely.cancel'}/></Button>
                          <Button type="primary" loading={confirmLoading} onClick={this.handleOk}><FormattedMessage
                               id={'geely.confirm'}/></Button>
                       </div>
                   }
                   width={'30%'}
            >
                <Form style={{width: '90%', margin: '0 auto'}}>
                    <Form.Item label={formatMessage({id: 'changePassword.oldPassword'})} {...formItemLayout}>
                        {getFieldDecorator('oldPassword', {
                            rules: [{
                                required: true, message: formatMessage({id: 'changePassword.fillPassword'}),
                            },{
                                validator: (rule, value, callback)=>this.validateToNextPassword(rule, value, callback),
                            },
                            ]
                        })(
                            <Input.Password/>
                        )}
                    </Form.Item>
                    <Form.Item label={formatMessage({id: 'changePassword.newPassword'})} {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                min: 8,
                                pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                                message: formatMessage({id: 'forceChangePassword.moreCharacters'})
                            }, {
                                validator: (rule, value, callback)=>this.handleValidator(rule, value, callback)
                            }],
                        })(
                            <Input.Password onBlur={this.handleConfirmBlur} />
                        )}
                    </Form.Item>
                    <Form.Item label={formatMessage({id: 'changePassword.againPassword'})} {...formItemLayout}>
                        {getFieldDecorator('passwordConfirm', {
                            rules: [{
                                required: true, message: formatMessage({id: 'changePassword.againPassword'}),
                            }, {
                                validator: this.checkPassword,
                            }],
                        })(
                            <Input.Password type="password" onBlur={this.handleConfirmBlur}/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['password'], { force: true });
        }
        callback();
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value
        this.setState({confirmDirty: this.state.confirmDirty || !!value})
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback(this.props.intl.formatMessage({id: 'changePassword.twicePassword'}))
        } else {
            callback()
        }
    }

    handleOk = () => {
        let form = this.props.form
        form.validateFields((err, values) => {
            if (!err) {
                this.props.appStore.saveChangePassWord()
            }
        })

    }

    handleCancel = () => {
        this.props.form.resetFields();
        this.props.appStore.cancelChangePassWord()
    };

    handleValidator = (rule, value, callback) => {
        const form = this.props.form
        if (value && value === form.getFieldValue('oldPassword')) {
            callback(this.props.intl.formatMessage({id: 'forceChangePassword.sameAsTheOld'}))
        } else {
            callback()
        }
        if (value && this.state.confirmDirty) {
            form.validateFields(['passwordConfirm'], {force: true});
        } else {
            callback()
        }
    }
}

export default ChangePassword