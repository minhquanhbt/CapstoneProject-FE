import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const Product = (item) => (
    <div>
        {/* {console.log(item)} */}
        <a href={"/detail/"+(item.item.group?"kanji/":"vocabulary/")+item.item.id}>
            <Card
                hoverable
                style={{ width: 180 , float:'left',marginRight:'3%',marginBottom:'50px'}}
                cover={
                    <div className='card' 
                        style={{fontSize: "50px", color:"#fffffe", backgroundColor: "#004643", textAlign: "center"}}>
                        {item.item.word?item.item.word:item.item.character}
                    </div>
                }
            >
                <Meta className="pronounce" 
                    title={item.item.group?(item.item.pronounces[0].Hiragana?item.item.pronounces[0].Hiragana:item.item.pronounces[0].Katakana):item.item.pronounce}/>
                <Meta className="meaning" 
                    title={item.item.group?item.item.group:item.item.meaning_vietnamese[0].meaning}/>
            </Card>
        </a>
    </div>

);

export default Product;