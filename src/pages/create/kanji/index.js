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
    Switch,
    notification,
} from 'antd';
import { addKanji } from '../../../api/detail';

const inputArr = [
  {
    type: "text",
    id: 1,
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
  const [defaultChecked, setdefaultChecked] = useState(false);
  const [onyo, setOnyo] = useState([]);
  const [arr, setArr] = useState(inputArr);

  const Mean = [];
  

  const katakana_regex = /^[ァ-ン]+$/;
  const hiragana_regex = /^[ぁ-ん]+$/;
  const kanji_regex = /^[一-龥]+$/;
  const romanji_regex = /^[A-Za-z]+$/;

  const onFinish = (values) =>{
    console.log(values, onyo)
    setSending(true)
    addKanji({
      character: values.character,
      group: values.group,
      japanese: values.japanese,
      level: values.level,
      mean: values.meaning,
      romanji: values.romanji,
      type: values.type,
    }).then(res => openNotificationSuccess(res))
        .catch((error) => {
          setSending(false)
          if (error.request.status === 400) {
            notification.error({
              message: 'Hán tự này đã được đăng ký!',
              duration: 3,
            })
          }
    })
  }

  
  const openNotificationSuccess = async (res) => {
    console.log(res)
    notification.success({
      message: 'Đã thêm từ thành công!',
      duration: 3,
    })
    await delay(1000);
  }

  const addInput = () => {
    let currentCheck = [...onyo];
    currentCheck[onyo.length] = false;
    setOnyo(currentCheck);
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

  
  const onTypeChange = (i, checked) => {
    let currentCheck = [...onyo];
    currentCheck[i] = checked;
    setOnyo(currentCheck);
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
              name="character"
              label="Từ Vựng:"
              rules={[
                  {
                      required: true,
                      message: 'Không thể để trống!',
                  },
                  {
                     pattern: kanji_regex,
                     message: 'Hãy điền từ vựng theo Hán tự'
                  },
                  {
                      type: 'string',
                      max: 1,
                      message: 'chỉ có thể lưu trữ hán tự có 1 kí tự',
                  }
              ]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              name="group"
              label="Âm hán việt của hán tự"
              rules={[
                  {
                      required: true,
                      message: 'Không thể để trống!',
                  },
              ]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              name="meaning"
              label="Nghĩa của hán tự"
              rules={[
                  {
                      required: true,
                      message: 'Không thể để trống!',
                  },
              ]}
          >
              <Input />
          </Form.Item>
          <p style={{marginLeft:'100px'}}>Thêm cách phát âm cho hán tự này :
            <Button onClick={addInput}>+</Button>
          </p>
            {arr.map((item, i) => {
            return (
              <div className={'pronouce-form '+i}>
              <Form.Item name={['type', i]} label="Phân loại" valuePropName="checked" initialValue={false} >
                <Switch checkedChildren="Onyomi" unCheckedChildren="Kunyomi" defaultChecked={defaultChecked} onChange={(checked)=>onTypeChange(i, checked)} />
              </Form.Item>
              <Form.Item
                  name={['romanji', i]}
                  label="Cách phát âm ở bảng chữ cái Roman"
                  rules={[
                    {
                      required: true,
                      message: 'Không thể để trống!',
                    },
                    {
                      pattern: romanji_regex,
                      message: 'Hãy điền đúng loại',
                    },
                  ]}
              >
                  <Input id={i}/>
              </Form.Item>
              <Form.Item
                  name={['japanese', i]}
                  label="Cách phát âm "
                  rules={[
                    {
                      required: true,
                      message: 'Không thể để trống!',
                    },
                    {
                      pattern: onyo[i]?katakana_regex:hiragana_regex,
                      message: 'Hãy điền đúng loại',
                    },
                  ]}
              >
                  <Input id={i}/>
              </Form.Item>
              </div>);
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
              <Select name="level" placeholder="Cấp độ của Hán tự này">
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
      <h2>Thêm Hán tự mới :</h2>
        {content()}
    </div>
    <div className='right'>
    </div>
    </div>
  )
} 
export default VocabularyDetail