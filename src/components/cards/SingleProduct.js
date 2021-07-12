import React from 'react'
import { Card, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons' 
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import laptop from '../../images/product.png'
import ProductListItem from './ProductListItem'
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'
// import 'react-star-rating/dist/css/react-star-rating.min.css'

import { showAverage } from '../../functions/rating'

const { Meta } = Card
const { TabPane } = Tabs

const SingleProduct = ({product, onStartClick, star}) => {

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
                {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : 'No rating yet'}
               
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success" /> <br /> Add to cart
                        </>, 
                        <Link to={`/`}><HeartOutlined className="text-info" /> <br /> Add to wishlist</Link>,
                        <RatingModal>
                             <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStartClick}
                                isSelectable={true}
                                startRatedColor="green"
                            />
                        </RatingModal>
                    ]}
                >
                    <ProductListItem product={product} />
                </Card>
            </div>
        </>
    )
}

export default SingleProduct
