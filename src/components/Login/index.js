import React, {Component} from 'react'
import {Form, Input, Icon, Button,message} from 'antd'
import {AESEncrypt} from "../../framework/utils/utils";
import {get, json} from "../../framework/utils/ajax";
import configObj from '../../project/config'
const form = Form.create()
const logo = require(`./imgs/login_logo.png`)
const bg = require(`./imgs/login_BG.png`)
const styles =  require(`../../project/Login/index.module.less`)

@form
class Index extends Component {

    async componentDidMount() {
        await  this.getCaptcha();
    }

    componentWillUnmount() {
        this.verifyCode = null
    }

    render() {
        const {form: {getFieldDecorator}} = this.props
        return (
            <div className={styles.container} style={{backgroundImage: `url(${bg})`}}>
                <div className={styles.logo}>
                    <img src={logo} alt=''/>
                </div>
                <div className={`${styles.loginForm} ${styles[`login-form-geely`]}`}>
                    <div className={styles.titleBar}>
                        <img src={require('./imgs/qingdenglu.png')} alt=''/>
                    </div>
                    <Form className={styles.forms} onSubmit={this.handleLogin}>
                        <Form.Item className={styles.textInput}>
                            {getFieldDecorator('loginName', {
                                rules: [{required: true, message: '用户名不能为空，请输入用户名！'}],
                            })(
                                <Input size="large" placeholder="请输入用户名" autoComplete="off"
                                       prefix={<Icon type="user" style={{fontSize: 16}}/>}/>
                            )}
                        </Form.Item>
                        <Form.Item className={styles.textInput}>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '密码不能为空，请输入密码！'}],
                            })(
                                <Input.Password size="large" placeholder="请输入密码" autoComplete="off"
                                       prefix={<Icon type='lock' style={{fontSize: 16}}/>}
                                       onPressEnter={this.handleLogin}/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('verification', {
                                validateFirst: true,
                                rules: [
                                    {required: true, message: '输入验证码'},
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value.length >= 6 && this.verifyCode.toUpperCase() !== value.toUpperCase()) {
                                                callback('验证码输入错误')
                                            }
                                            callback()
                                        }
                                    },
                                ]
                            })(
                                <Input
                                    autoComplete="off"
                                    placeholder={'请输入验证码'}
                                    prefix={<Icon type="safety" style={{fontSize: 16}}/>}
                                    size='large'
                                    addonAfter={<img alt='' id='CaptchaID' width={'100px'} height={'38px'}
                                                     onClick={this.getCaptcha}/>}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            为了更好的使用体验，请使用
                            <img width={30} height={30} src={require('./imgs/google.png')} alt=""/>
                            <img width={30} height={30} src={require('./imgs/firefox.png')} alt=""/>
                        </Form.Item>
                        <Form.Item style={{width: '100%', height: '16.8%', textAlign: 'center'}}>
                            <Button type="primary" className={styles.button} htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }

    handleLogin = (e) => {
        e.preventDefault();
        const {form: {validateFieldsAndScroll}} = this.props
        validateFieldsAndScroll((errors, values) => {
            if (errors){
                if (errors.verification && values.verification) {
                    this.getCaptcha(); /**重新生成验证码**/
                }
            }else{
                /**表单登录时，若验证码长度小于6则不会验证，所以我们这里要手动验证一次***/
                if(this.verifyCode.toUpperCase() !== values.verification.toUpperCase()){
                    this.props.form.setFields({
                        verification: {
                            value: values.verification,
                            errors: [new Error('验证码错误')]
                        }
                    })
                    this.getCaptcha(); /**重新生成验证码**/
                    return
                }
                this.login(values)
            }
        })
    }

    login = async (values) => {
        let loginForm = values
        loginForm.password = AESEncrypt(loginForm.password, '1111222233334444')
        try {
            const res = await json.post(`login:pc`, loginForm)
            if (res.status) {
                localStorage.setItem('key', JSON.stringify(res.data));     //保存请求数据，以便强制修改密码时读取该数据
                await this.props.loginSuccess(res.data)
            } else {
                message.warning(res.msg)
                this.getCaptcha()
            }
        } catch (error) {
            message.warning(error)
        }
    }

    /**获取验证码**/
    getCaptcha = () => {
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", `${configObj.apiUrl}/user:captcha?stamp=${Date.now()}`, true);
        xmlhttp.responseType = "blob";
        xmlhttp.onload = function () {
            if (this.status === 200) {
                var blob = this.response;
                var img = document.getElementById("CaptchaID");
                img.onload = function (e) {
                    window.URL.revokeObjectURL(img.src);
                };
                img.src = window.URL.createObjectURL(blob);
            }
        }
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                this.verifyCode = xmlhttp.getResponseHeader("Captcha")
            }
        }
        xmlhttp.send();
        this.props.form.resetFields("verification")
        return this.verifyCode
    }
}

export default Index