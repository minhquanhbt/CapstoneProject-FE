/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import './style.css';
import { getLogedMainData, getMainData } from '../../api/main_page';
import { Card } from 'antd';

const { Meta } = Card;

const QuizCard = () => {
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
    return (
        // <div className="latest-articles" style={{ margin: "0px 15%" }}>
        <div style={{ margin: "0px 14% 0 19%" }}>
            <div>
                <a href={"/detail/"+list.id}>
                    <Card
                        hoverable
                        style={{ width: 180 , float:'left',marginRight:'5%',marginBottom:'50px'}}
                        cover={
                            <div className='card' 
                                style={{fontSize: "50px", backgroundColor: "#f9bc60", textAlign: "center"}}>
                                {list.word?list.word:list.character}
                            </div>
                        }
                    >
                        <Meta title={list.group?list.group:list.pronouce}/>
                    </Card>
                </a>
            </div>
        </div>
    );
};

export default () => <QuizCard />;