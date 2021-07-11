import React from 'react'
import { Card, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons' 
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import laptop from '../../images/product.png'
import ProductListItem from './ProductListItem'
import StarRating from 'react-star-ratings'
// import 'react-star-rating/dist/css/react-star-rating.min.css'

const { Meta } = Card
const { TabPane } = Tabs

const SingleProduct = ({product}) => {

    const { title, images, description, _id } = product

    return (
        <>
        
            <div className="col-md-7">
               {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map(image => <img src={image.url} key={image.public_id} />)}
                </Carousel> : (<Card cover={
                    <img src={laptop} />
                }></Card>) }

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call use on XXXX
                    </TabPane>
                </Tabs>
            </div>
            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                
                <StarRating
                    name={_id}
                    numberOfStars={5}
                    rating={3}
                    changeRating={(newRating, name) => console.log(name) }
                    isSelectable={true}
                    startRatedColor="green"
                />
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
