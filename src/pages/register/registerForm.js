import React, { useState, useEffect } from 'react';
import './style.css';
import logo from '../../logo_app.png';
import { register } from '../../api/auth';
import {
    Form,
    Input,
    Button,
    Select,
    Spin,
    Checkbox,
    Upload,
    notification,
    message
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
};

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const RegisterForm = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [loading, setLoading] = useState(false);
    const [isImg, setISImg] = useState(true);
    const [img, setImg] = useState();
    const [sending, setSending] = useState(false);
    const onFinish = async (values) => {
        try{
            setSending(true)
            const formData = new FormData()
            formData.append('name', values.name)
            formData.append('username', values.username)
            formData.append('email', values.email)
            formData.append('password', values.password)
            formData.append('level', values.level)
            formData.append('avatar', img.originFileObj)
            await register(formData).then((res) => {
                console.log(res[0]);
                openNotificationSuccess(res[0])
            }).catch((error) => {
                console.log(error)
                setSending(false)
                if (error.request.status === 403) {
                    notification.error({
                        message: 'Email này đã được đăng ký!',
                        duration: 3,
                    })
                }
            })
        } catch(e){
            notification.error({
                message: 'Hãy tải lên ảnh đại diện của bạn',
                duration: 3,
            })
        }
    };
    const openNotificationSuccess = async (res) => {
        notification.success({
            message: 'Thư xác nhận đã được gửi đến '+res.email+'. Vui lòng kiểm tra và xác nhận đăng ký ',
            duration: 3,
        })
        await delay(3000); 
        window.location.href= "/";
    }
    
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    

    const onChangeImg = (response) => {
        try{
            if (response.file.status !== 'uploading') {
                setLoading(true)
            }
            if (response.file.status === 'done') {
                setImg(response.file);
            } else if (response.file.status === 'error') {
                message.error(`${response.file.name} 
                                file upload failed.`);
            }
            setLoading(false)
        }catch(e){console.log(e)}
    };
    const removeImg = () => {
        try{
            setImg(undefined);
        }catch(e){console.log(e)}
    };

    const onPreview = async (file) => {
        if(isImg){
            let src = file.url;

            if (!src) {
                src = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj);

                    reader.onload = () => resolve(reader.result);
                });
            }

            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow?.document.write(image.outerHTML);
        }
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = (file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg'|| file.type === 'image/svg'|| file.type === 'image/gif');
      
        if (!isJpgOrPng) {
          message.error('Bạn chỉ có thể tải lên file có định dạng JPG/PNG/JPG/SVG!');
        }
      
        const isLt2M = (file.size / 1024 / 1024 < 2);
      
        if (!isLt2M) {
          message.error('Ảnh có dung lượng quá lớn!');
        }
        setISImg(isJpgOrPng && isLt2M);
        return isJpgOrPng && isLt2M;
      };
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div
            style={{
              marginTop: 8,
            }}
          >
            Tải lên
          </div>
        </div>
      );

    
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
                                        max: 64,
                                        message: 'Hãy đặt mật khẩu có ít hơn 64 kí tự',
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
                            <Form.Item label="Ảnh đại diện" name="photo" >
                                <ImgCrop>
                                    <Upload
                                        customRequest={dummyRequest}
                                        listType="picture-card"
                                        onChange={(response)=>onChangeImg(response)}
                                        accept=".png,.jpeg,.jpg,.gif,.svg"
                                        beforeUpload={beforeUpload}
                                        onPreview={onPreview}
                                        maxCount={1}
                                        onRemove={removeImg}
                                    >
                                        {uploadButton}
                                    </Upload>
                                </ImgCrop>
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
                                    Tôi đồng ý với các chính sách và điều khoản của Help Kanji.
                                </Checkbox>
                            </Form.Item>
                            <Form.Item
                                className='bt_register'>
                                {sending?<Spin/>:<Button type="primary" htmlType="submit">
                                    Đăng ký
                                </Button>}
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