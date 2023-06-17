/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import './style.css';
import Product from './card';
import { getLogedMainData, getMainData } from '../../api/main_page';

const Quiz = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if(localStorage['user-info']!=null){
                await getLogedMainData().then((res) => {
                    // console.log(res)
                    setList((list) => res.data);
                })
                .catch((error) => console.log(error))
            }
            else{
                await getMainData().then((res) => {
                    // console.log(res)
                    setList((list) => res.data);
                })
                .catch((error) => console.log(error))
            }
        }
        fetchData();

    }, [])
    
    let component;
    if (list !== null) {
        if (list !== undefined) {
            component = (
                list.map((item) => <Product item={item}></Product>)
            )
        }
    }
    else {
        component = (<h1>fail</h1>)
    }
    return (
        // <div className="latest-articles" style={{ margin: "0px 15%" }}>
        <div style={{ margin: "0px 14% 0 19%" }}>
            {component}
        </div>
    );
};

export default () => <Quiz />;