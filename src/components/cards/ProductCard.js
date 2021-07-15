import React from 'react'
import productImage from '../../images/product.png'
import {Card } from 'antd'
import { EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { showAverage } from '../../functions/rating'



const { Meta } = Card

const ProductCard = ({product}) => {

    const { title, description, price, images, slug } = product
    return (
       <>
       {product && product.ratings && product.ratings.length > 0 ? 
       showAverage(product) : <div className="text-center p-4">No rating yet</div>}
        <Card cover={
            <img src={images && images.length ? images[0].url : productImage } style={{height: "150px", objectFit: "cover"}} />
        }
        actions={[
            <Link to={`/product/${slug}`}><EyeOutlined className="text-info" /> <br/> View Product</Link>, <><ShoppingCartOutlined className="text-warning"/> <br/> Add to cart</>
        ]}
        >
            <Meta title={`${title} $${price}`} description={`${description && description.substring(0, 40)}...`} />
        </Card>
        </>

    )
}

export default ProductCard
