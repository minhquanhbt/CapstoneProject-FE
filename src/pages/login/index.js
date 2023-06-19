/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./style.css";
import LoginForm from './loginForm';

function login() {
  if(localStorage['user-info']!=null || sessionStorage['user-info']!=null) {window.location.href = '/main'}
  else{
    return (
          <div>
            <LoginForm />
          </div> 
    )
  }
}
export default login