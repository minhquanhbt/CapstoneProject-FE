/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import './style.css';
import { Form, Input, Button, Checkbox,notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../logo_app.png';
import {login} from '../../api/auth';

function LoginForm() {
  const onFinish = async (values) => {
    await login({
      username: values.username,
      password: values.password,
    }).then(res => openNotificationSuccess(res))
      .catch((error) => {
        console.log(error)
        if (error.request.status === 400) { 
          notification.error({
              message: 'Sai username hoặc mật khẩu',
              duration: 3,
            })
        }
      })
  };
  const openNotificationSuccess = (res) => {
    localStorage.setItem("user-info", JSON.stringify(res.data));
    notification.success({
      message: 'Chào mừng bạn quay lại, '+res.data.name+"!",
      duration: 3,
    })
    window.location.href= "/main";
  }
  return (
    <div>
      <title>Đăng nhập hoặc Đăng ký</title>
      <div>
        
      </div>
      <div style={{ width: "50%", float: "left", textAlign: "right" }}>
        <img src={logo} style={{height: '50%',width:'auto',margin:'10% auto'}} />
      </div>
      <div style={{ width: "25%", float: "left"}}>
        <div style={{margin:'18% auto',backgroundColor:"rgb(81 251 152)", padding:"35px 50px",borderRadius:'20px', border:'2px solid white'}}>
          <b style={{fontSize:"26px"}}>Đăng nhập</b><br /><br />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Username(Tên đăng nhập)!',
                },
                {
                    type: 'string',
                    min: 8,
                    message: 'Hãy nhập tên đăng nhập có nhiều hơn 8 kí tự',
                },
                {
                    type: 'string',
                    max: 64,
                    message: 'Hãy nhập tên đăng nhập có ít hơn 64 kí tự',
                }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username/Tên đăng nhập" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu của bạn!',
                },
                {
                    type: 'string',
                    min: 8,
                    message: 'Hãy nhập mật khẩu có nhiều hơn 8 kí tự',
                },
                {
                    type: 'string',
                    max: 24,
                    message: 'Hãy nhập mật khẩu có ít hơn 24 kí tự',
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                Quên mật khẩu?
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Đăng nhập
              </Button>
              Hoặc <a href="/register">Đăng ký ngay!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>

  );
};

export default () => <LoginForm />;