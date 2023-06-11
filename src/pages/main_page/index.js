/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./style.css";
import ProductListForm from './cards';
// import { useCookies } from "react-cookie";

function ProductList() {
  // const [cookies] = useCookies(["userInfo"]);
  let role = 1;
  if(localStorage.getItem('remember') ==='local'){
    role = JSON.parse(localStorage.getItem('user-info')).role;
  }else if(localStorage.getItem('remember') ==='session'){
    if((sessionStorage.getItem('user-info')).role !== undefined){
      role = JSON.parse(sessionStorage.getItem('user-info')).role;
    }
  }
  if(role===2) {window.location.href = '/sellingProduct'}
  // else if(role===0) {window.location.href = '/admin'}
  // if (cookies.userInfo.role===2){window.location.href = '/sellingProduct'}
  else{
    return (
        <div>
          <ProductListForm />
        </div>
      )
  }
}
export default ProductList