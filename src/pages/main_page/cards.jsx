/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import './style.css';
import Product from './card';
import { getCards1 } from '../../api/main_page';

const ProductListForm = () => {
    const [list, setList] = useState([]);

    useEffect(async () => {
        await getCards1().then((res) => {
            setList((list) => res.data);
        })
        .catch((error) => console.log(error))
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

export default () => <ProductListForm />;