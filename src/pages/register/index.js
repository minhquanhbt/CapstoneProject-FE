/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./style.css";
import RegisterForm from './registerForm';

function Register() {
//   if(localStorage['user-info']!=null || sessionStorage['user-info']!=null) {window.location.href = '/productList'}
//   else{
    return (
          <div>
            <RegisterForm />
          </div>
    )
//   }
}
export default Register