import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons' 
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import laptop from '../../images/product.png'
import ProductListItem from './ProductListItem'

const {Meta} = Card

const SingleProduct = ({product}) => {

    const { title, images } = product

    return (
        <>
        
            <div className="col-md-7">
               {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map(image => <img src={image.url} key={image.public_id} />)}
                </Carousel> : (<Card cover={
                    <img src={laptop} />
                }></Card>) }
            </div>
            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success" /> <br /> Add to cart
                        </>, 
                        <Link to={`/`}><HeartOutlined className="text-info" /> <br /> Add to wishlist</Link>,
                    ]}
                >
                    <ProductListItem product={product} />
                </Card>
            </div>
        </>
    )
}

export default SingleProduct
