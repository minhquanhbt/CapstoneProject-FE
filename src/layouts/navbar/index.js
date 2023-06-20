/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Menu, Dropdown, Avatar, Input, Space, Button } from 'antd';
import { ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import './style.scss';
// import { useCookies} from "react-cookie"
import logo from '../../logo_app.png';
import { search } from '../../api/search';

export default function Navbar() {

  const [data_search, setData_search] = useState([]);
  // const [reload, setReload] = useState(false);

  const onSearch = async (value) => {
    if (localStorage.getItem('data-search') !== null) {
      localStorage.setItem('data-search', null)
    }
    if (value !== "") {
      try {
        // setReload(false)
        await search({
          key: value
        }).then((res) => {
          if (res.data.length > 0) { setData_search(res.data); }
        }).catch((error) => console.log(error))
      } catch (e) { console.error(e) }
      localStorage.setItem("data-search", JSON.stringify(data_search))
    }
    else {
      setData_search(null)

      // localStorage.setItem("data-search", JSON.stringify());
    }
    if (data_search.length > 0) {
      window.location.href = "/search"
    }
  }

  let info = JSON.parse(localStorage.getItem('user-info')); 

  const { Search } = Input;

  let role;
  if (info !== undefined) {
    if (info !== null) {
      role = info.role
    }
  }

  const handleLogout = async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.log(error)
    }
  }
  const handleHistory = () => {
    window.location.href = '/history'
  }
  const handleProfile = () => {
    window.location.href = '/profile'
  }
  const userInformation = (
    <Menu className=" menuNavbar">
      <Menu.Item key="0">
        <a onClick={handleProfile}>
          <a>Thông tin người dùng</a>
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a onClick={handleLogout}>Đăng xuất</a>
      </Menu.Item>
    </Menu>
  )
  let checkLogin
  if (info !== undefined && info !== null) {
    checkLogin = (
      <div>
        <div>
          <Dropdown overlay={userInformation} trigger={['click']}>
            <div className="avatarNavbar">
              <Avatar src={info.avatar} className="" style={{ float: 'right', width: '40px', height: '40px' }} />
            </div>
          </Dropdown>
        </div>
      </div>
    )
  }
  else {
    checkLogin = (
      <div className='login-button'>
        <a href="/register" style={{ padding: 10 }}> Đăng ký</a>
        |
        <a href="/" style={{ padding: 10 }}>Đăng nhập</a>
      </div>
    )
  }

  return (
    <div className="navbar">
      <div >
        <div>
          {role === 0 ?
            <a href="/admin">
              <MenuOutlined style={{ fontSize: '30px', marginRight: "15px" }} />
            </a>
            : null
          }
          <a href="/main">
            <img src={logo} alt="logo" className="logo_nav" />
          </a>
        </div>
      </div>
      <div className="searchNavbar">
        <div>
          <Search style={{ width: 500 }} placeholder="Bạn cần gì?" onSearch={onSearch} enterButton />
        </div>
      </div>
      <div className="cartNavbar">
        <Space direction="horizontal">
          {checkLogin}
        </Space>
      </div>
      {/* <main>
        {data_search ?
          <SearchProduct item={data_search}></SearchProduct>
          :
          null
        }
      </main> */}
    </div>
  )
}