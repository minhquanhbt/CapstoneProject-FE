import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const Product = (item) => (
    <div>
        {console.log(item)}
        <a href={"/detail/"+item.item.id}>
            <Card
                hoverable
                style={{ width: 180 , float:'left',marginRight:'5%',marginBottom:'50px'}}
                cover={
                    <div className='card' 
                        style={{fontSize: "50px", backgroundColor: "#f9bc60", textAlign: "center"}}>
                        {item.item.word?item.item.word:item.item.character}
                    </div>
                }
            >
                <Meta title={item.item.group?item.item.group:item.item.pronouce}/>
            </Card>
        </a>
    </div>

);

export default Product;