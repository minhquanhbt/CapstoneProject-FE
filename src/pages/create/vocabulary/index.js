/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './style.css';
import {
    Form,
    Input,
    Button,
    Select,
    Spin,
    notification,
    Checkbox,
} from 'antd';
import { addVocabulary } from '../../../api/detail';

const inputArr = [
  {
    type: "text",
    id: 1,
    value: ""
  },
];
const inputPArr = [
  {
    type: "text",
    id: 1,
    value: ""
  },
  {
    type: "text",
    id: 2,
    value: ""
  },
  {
    type: "text",
    id: 3,
    value: ""
  }
];
const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

function VocabularyDetail() {
  const { Option } = Select;
  const [componentSize, setComponentSize] = useState('default');
  const [sending, setSending] = useState(false);
  const { id } = useParams();
  const [arr, setArr] = useState(inputArr);
  const [parr, setpArr] = useState(inputPArr);

  const Mean = [];
  
  const hiragana_regex = /^[ぁ-ん]+$/;
  const word_regex = /^[ぁ-ん一-龯]+$/;

  const onFinish = (values) =>{
    console.log(values)
    setSending(true)
    addVocabulary({
      word: values.word,
      pronounce: values.pronounce,
      meaning: values.meaning,
      examplej: values.example_j,
      examplev: values.example_v,
      miss: values.miss,
      level: values.level,
    }).then(res => openNotificationSuccess(res))
        .catch((error) => {
          setSending(false)
          if (error.request.status === 400) {
            notification.error({
              message: 'Email này đã được đăng ký!',
              duration: 3,
            })
          }
    })
  }

  const openNotificationSuccess = async (res) => {
    notification.success({
      message: 'Đã thêm từ thành công!',
      duration: 3,
    })
    await delay(1000); 
    window.location.href= "/";
  }

  const addInput = () => {
    setArr(s => {
      return [
        ...s,
        {
          type: "text",
          value: ""
        }
      ];
    });
  };
  const addPInput = () => {
    setpArr(s => {
      return [
        ...s,
        {
          type: "text",
          value: ""
        }
      ];
    });
  };

  const content = () =>{
    return(
      <div className='main-content'>
        
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
          size={componentSize}
          onFinish={onFinish}
      >
          <Form.Item
              name="word"
              label="Từ Vựng:"
              rules={[
                  {
                      required: true,
                      message: 'Không thể để trống!',
                  },
                  {
                     pattern: word_regex,
                     message: 'Hãy điền từ vựng theo Hán tự hoặc hiragana'
                  },
                  {
                      type: 'string',
                      min: 2,
                      message: 'chỉ có thể lưu trữ từ có ít nhất 2 kí tự',
                  },
                  {
                      type: 'string',
                      max: 5,
                      message: 'chỉ có thể lưu trữ từ có nhiều nhất 5 hán tự',
                  }
              ]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              name="pronounce"
              label="Cách phát âm bằng tiếng Nhật"
              rules={[
                  {
                      required: true,
                      message: 'Không thể để trống!',
                  },
                  {
                     pattern: hiragana_regex,
                     message: 'Hãy điền cách đọc theo hiragana'
                  },
                  {
                      type: 'string',
                      min: 1,
                    message: 'Hãy đặt đúng cách phát âm của từ',
                  },
              ]}
          >
              <Input />
          </Form.Item>
          <p style={{marginLeft:'100px'}}>Thêm nghĩa cho từ vựng này :
            <Button onClick={addInput}>+</Button>
          </p>
            {arr.map((item, i) => {
            return (
              <div className={'meaning-form '+i}>
              <Form.Item
                  name={['meaning', i]}
                  label="Nghĩa của từ vựng"
                  rules={[
                    {
                      required: true,
                      message: 'Không thể để trống!',
                    },
                  ]}
              >
                  <Input id={i}/>
              </Form.Item>
              <Form.Item
                  name={['example_j', i]}
                  label="Ví dụ tiếng nhật của từ vựng"
                  rules={[
                    {
                      required: true,
                      message: 'Không thể để trống!',
                    },
                  ]}
              >
                  <Input id={i}/>
              </Form.Item>
              <Form.Item
                  name={['example_v', i]}
                  label="Dịch nghĩa tiếng việt của ví dụ"
                  rules={[
                    {
                      required: true,
                      message: 'Không thể để trống!',
                    },
                  ]}
              >
                  <Input id={i}/>
              </Form.Item>
              </div>);
            })}
            <p style={{marginLeft:'100px'}}>Hãy thêm một số cách phát âm có thể sai của từ vựng:
              <Button onClick={addPInput}>+</Button>
            </p>
              {parr.map((item, i) => {
              return (
                <Form.Item
                    name={['miss', i]}
                    label="Cách phát âm nhầm lẫn"
                    rules={[
                      {
                        required: true,
                        message: 'Không thể để trống!',
                      },
                    ]}
                >
                    <Input id={i}/>
                </Form.Item>);
              })}
          <Form.Item
              name="level"
              label="Cấp độ JLPT"
              rules={[
                  {
                      required: true,
                      message: 'Hãy cho chúng tôi biết cấp độ của từ vựng',
                  },
              ]}
          >
              <Select name="level" placeholder="Cấp độ của từ vựng này">
                  <Option value={5}>N5</Option>
                  <Option value={4}>N4</Option>
                  <Option value={3}>N3</Option>
                  <Option value={2}>N2</Option>
                  <Option value={1}>N1</Option>
              </Select>
          </Form.Item>
          <Form.Item
              className='bt_register'>
              {sending?<Spin/>:<Button type="primary" htmlType="submit">
                  Thêm từ mới
              </Button>}
              <Button type="primary" htmlType="exit" style={{ marginLeft: '20px' }}>
                  <a href='/' style={{ textDecoration: 'none' }}>Hủy</a>
              </Button>
          </Form.Item>
      </Form>
      </div>
    )
  }

  return (
    <div className='main-container'>
    <div className='left'>
    </div>
    <div className='main'>
      <h2>Thêm từ vựng mới :</h2>
        {content()}
    </div>
    <div className='right'>
    </div>
    </div>
  )
} 
export default VocabularyDetail