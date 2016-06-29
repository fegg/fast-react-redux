import React, { Component } from 'react'
import { Form, Button, Input } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as loginAction from '../../actions/login'

import './login.scss'

const FormItem = Form.Item

function noop() {
  return false;
}

const mapStateToProps = state => {
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(loginAction, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
class LoginApp extends Component {

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    }

    userExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            this.props.actions.searchUsers(value);
            const isExists = this.props.login.isExists
            if(!isExists) {
                callback();
            } else {
                callback('用户名已存在')
            }
        }
    }

    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePasswd'], { force: true });
        }
        callback();
    }

    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('passwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    checkRule() {
        const { getFieldProps } = this.props.form

        const nameProps = getFieldProps('name', {
            rules: [{
                required: true,
                min: 5,
                message: '用户名至少为 5 个字符'
            }, {
                validator: this.userExists.bind(this)
            }]
        })
        const emailProps = getFieldProps('email', {
            validate: [{
                rules: [{
                    required: true,
                    message: '注册邮箱不能为空'
                }],
                trigger: 'onBlur'
            }, {
                rules: [{
                    type: 'email',
                    message: '请输入正确的邮箱地址'
                }],
                trigger: ['onBlur', 'onChange']
            }]
        })
        const passwdProps = getFieldProps('passwd', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请填写密码'
            }, {
                validator: this.checkPass.bind(this)
            }]
        });
        const rePasswdProps = getFieldProps('rePasswd', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码'
            }, {
                validator: this.checkPass2.bind(this)
            }]
        });

        return {
            nameProps,
            emailProps,
            passwdProps,
            rePasswdProps
        }
    }

    render() {
        const { nameProps, emailProps, passwdProps, rePasswdProps } = this.checkRule();
        const { getFieldError, isFieldValidating } = this.props.form;

        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }

        return (
            <div className="login-main">
                <Form horizontal form={this.props.form}>
                    <FormItem { ...layout } label="用户名" hasFeedback
                        help={ isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ') }>
                        <Input {...nameProps} placeholder="请输入用户名" />
                    </FormItem>

                    <FormItem { ...layout } label="邮箱" hasFeedback>
                        <Input {...emailProps} type="email" placeholder="请输入注册邮箱" />
                    </FormItem>

                    <FormItem { ...layout } label="密码" hasFeedback>
                        <Input {...passwdProps} type="password" autoComplete="off"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                    </FormItem>

                    <FormItem { ...layout } label="确认密码" hasFeedback>
                        <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                    </FormItem>

                    <FormItem className="login-footer">
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                        &nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

LoginApp = Form.create()(LoginApp);

export default LoginApp;