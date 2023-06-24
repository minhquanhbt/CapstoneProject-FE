/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './style.css';
import { getLogedMainData, getMainData } from '../../api/main_page';
function Test() {

    useEffect(() => {
        async function fetchData() {
            if(localStorage['user-info']!=null){
                // await getLogedMainData().then((res) => {
                //     // console.log(res)
                //     setList((list) => res.data);
                // })
                // .catch((error) => console.log(error))
            }
            else{
                window.location.href = '/';
            }
        }
        fetchData();
    }, [])

    return (
        <div className='main-container'>
        </div>
    )
} 
export default Test