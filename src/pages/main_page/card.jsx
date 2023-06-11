import React from 'react';
import { Card, Rate } from 'antd';

const { Meta } = Card;

function averageRate(list_review) {
    if (list_review !== undefined) {
        if (list_review.length > 0) {
            let res = 0;
            for (let i = 0; i < list_review.length; i++) {
                res += list_review[i];
            }
            return (res / list_review.length);
        }
    }
    return 0;
}

const Product = (item) => (
    <div>
        {/* {console.log(item)} */}
        <a href={"/product_detail/"+item.item.product.id}>
            <Card
                hoverable
                style={{ width: 240 , float:'left',marginRight:'5%',marginBottom:'50px'}}
                cover={<img alt="mainImage" src={item.item.product.image} />}
            >
                <Rate allowHalf disabled defaultValue={averageRate(item.item.star_rating)} />
                <Meta title={item.item.product.name} description={item.item.product.price+" VND"} />
            </Card>
        </a>
    </div>

);

export default Product;