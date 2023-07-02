/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Menu, Dropdown, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { SearchBar } from './searchbar';
import './style.scss';
// import { useCookies} from "react-cookie"
import logo from '../../logo_app.png';

export default function Navbar() {

  let info = JSON.parse(localStorage.getItem('user-info')); 

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
  const handleKanji = () => {
    window.location.href = '/kanji/add'
  }
  const handleVoc = () => {
    window.location.href = '/vocabulary/add'
  }
  const handleProfile = () => {
    window.location.href = '/profile'
  }
  const userInformation = (
    <Menu className="menuNavbar">
      <Menu.Item key="0">
        <a onClick={handleProfile}>
          <a>Thông tin người dùng</a>
        </a>
      </Menu.Item>
      {info.role === 2?
        <Menu.Item key="2">
          <a onClick={handleKanji}>
            <a>Thêm Kanji</a>
          </a>
        </Menu.Item>:null}
      {info.role === 2?
        <Menu.Item key="3">
          <a onClick={handleVoc}>
            <a>Thêm từ vựng</a>
          </a>
        </Menu.Item>:null} 
      <Menu.Item key="1">
        <a onClick={handleLogout}>Đăng xuất</a>
      </Menu.Item>
    </Menu>
  )
  let checkLogin
  if (info !== undefined && info !== null) {
    checkLogin = (
      <div>
        <Dropdown overlay={userInformation} trigger={['click']}>
          <div className="name-button">
            <p className='name'>{info.name}</p>
          </div>
        </Dropdown>
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
      <div className='logo'>
          {role === 0 ?
            <a href="/admin">
              <MenuOutlined style={{ fontSize: '30px', marginRight: "15px" }} />
            </a>
            : null
          }
          <a href="/main" className='logo-image'>
            <img src={logo} alt="logo" className="logo_nav" />
          </a>
      </div>
      <div className='search-bar'>
        {(window.location.pathname === '/exam')?null:<SearchBar />}
      </div>
      <div className="menu">
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