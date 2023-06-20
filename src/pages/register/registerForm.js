import React, { useState, useEffect } from 'react';
import './style.css';
import logo from '../../logo_app.png';
import { register } from '../../api/auth';
import {
    Form,
    Input,
    Button,
    Select,
    Checkbox,
    notification,
} from 'antd';

const RegisterForm = () => {
    const [componentSize, setComponentSize] = useState('default');
    const onFinish = (values) => {
        console.log(values)
        register({
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
            level: values.level,
        }).then(res => openNotificationSuccess(res))
            .catch((error) => {
                if (error.request.status === 403) {
                    notification.error({
                        message: 'Email này đã được đăng ký!',
                        duration: 3,
                    })
                }
            })
    };
    const openNotificationSuccess = (res) => {
        localStorage.setItem("user-info", JSON.stringify(res.data));
        notification.success({
            message: 'Thư xác nhận đã được gửi đến '+res.data.email+'. Vui lòng kiểm tra và xác nhận đăng ký ',
            duration: 3,
        })
        localStorage.setItem("user-info", JSON.stringify(res.data));
        localStorage.setItem("remember", 'local');
        if(res.data.role!==2){window.location.href= "/productList";}
        else if(res.data.role!==1){window.location.href= "/sellingProduct";}
    }
    
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    
    const { Option } = Select;
    //-------------------------------end

    return (
        <div>
            <div>
                {/* header */}
            </div>
            <div style={{ width: "50%", float: "left", textAlign: "right" }}>
                <img src={logo} style={{ height: '50%', width: 'auto', margin: '20% auto' }} />
            </div>
            <div style={{ width: "30%", float: "left" }}>
                <div>

                </div>
                <div style={{ margin: '80px auto', backgroundColor: "rgb(81 251 152)", padding: "35px 10px", borderRadius: '20px', border: '2px solid white' }}>
                    <div style={{ textAlign: 'center' }}>
                        <b style={{ fontSize: "26px" }}>Đăng Ký Tài Khoản</b><br /><br />
                    </div>
                    <div>
                        <Form
                            labelCol={{
                                span: 7,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            layout="horizontal"
                            initialValues={{
                                size: componentSize,
                            }}
                            onValuesChange={onFormLayoutChange}
                            size={componentSize}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="name"
                                label="Họ và tên:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy cho chúng tôi biết tên của bạn',
                                    },
                                    {
                                        type: 'string',
                                        min: 5,
                                        message: 'Hãy đặt tên có nhiều hơn 5 kí tự',
                                    },
                                    {
                                        type: 'string',
                                        max: 64,
                                        message: 'Hãy đặt tên có ít hơn 64 kí tự',
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="username"
                                label="Tên đăng nhập"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu của bạn!',
                                    },
                                    {
                                        type: 'string',
                                        min: 8,
                                        message: 'Hãy đặt tên đăng nhập có nhiều hơn 8 kí tự',
                                    },
                                    {
                                        type: 'string',
                                        max: 64,
                                        message: 'Hãy đặt tên đăng nhập có ít hơn 64 kí tự',
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'E-mail không hợp lệ!',
                                    },
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập E-mail của bạn!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu của bạn!',
                                    },
                                    {
                                        type: 'string',
                                        min: 8,
                                        message: 'Hãy đặt mật khẩu có nhiều hơn 8 kí tự',
                                    },
                                    {
                                        type: 'string',
                                        max: 24,
                                        message: 'Hãy đặt mật khẩu có ít hơn 24 kí tự',
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Nhập lại mật khẩu"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập lại mật khẩu!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name="level"
                                label="Cấp độ JLPT"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy cho chúng tôi biết cấp độ của bạn',
                                    },
                                ]}
                            >
                                <Select name="level" placeholder="Bạn muốn bắt đầu ở cấp độ nào">
                                    <Option value="N5">N5</Option>
                                    <Option value="N4">N4</Option>
                                    <Option value="N3">N3</Option>
                                    <Option value="N2">N2</Option>
                                    <Option value="N1">N1</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                className='bt_register'
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject(new Error('Bạn phải đồng ý với các chính sách và điều khoản của chúng tôi!')),
                                    },
                                ]}
                            >
                                <Checkbox>
                                    Tôi đồng ý với các chính sách và điều khoản của Website.
                                </Checkbox>
                            </Form.Item>
                            <Form.Item
                                className='bt_register'>
                                <Button type="primary" htmlType="submit">
                                    Đăng ký
                                </Button>
                                <Button type="primary" htmlType="exit" style={{ marginLeft: '20px' }}>
                                    <a href='/login' style={{ textDecoration: 'none' }}>Hủy</a>
                                </Button>
                            </Form.Item>
                        </Form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default () => <RegisterForm />;