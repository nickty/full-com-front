import React, { useState } from 'react'
import { Card, Tabs, Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons' 
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import laptop from '../../images/product.png'
import ProductListItem from './ProductListItem'
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { showAverage } from '../../functions/rating'
import { addToWishlist } from '../../functions/user'
import { toast } from 'react-toastify'

const { Meta } = Card
const { TabPane } = Tabs

const SingleProduct = ({product, onStartClick, star}) => {
    const [tooltip, setTooltip] = useState('Click to add to cart')

    let history = useHistory()

    //redux
    const {user, cart} = useSelector(state => state)
    const dispatch = useDispatch()

    const { title, images, description, _id } = product

    const handleAddtocart = () => {
        //create cart array
        let cart = []
        if(typeof window !== 'undefined'){
            //if cart is in localStorage GET it
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            // push new product to cart 
            cart.push({
                ...product,
                count: 1
            })
            //remove duplicates
            let unique = _.unionWith(cart, _.isEqual)

            //save to local strorage
            // console.log('unique', unique)
            localStorage.setItem('cart', JSON.stringify(unique))

            setTooltip('Already Added')

            //add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique
            })

            dispatch({
                type:'SET_VISIBLE',
                payload: true
            })
        }
    }

    const handleAddToWishlist = e => {
        e.preventDefault()

        addToWishlist(product._id, user.token).then( res => {
            toast.success('Added to wishlist')
        })

        history.push('/user/wishlist')
    }

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
                {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className="text-center p-4">No rating yet</div>}
               
                <Card
                    actions={[
                        <>
                            <Tooltip title={tooltip}> <a onClick={handleAddtocart}><ShoppingCartOutlined className="text-warning"/> <br/> Add to cart</a></Tooltip>
                        </>, 
                        <a onClick={handleAddToWishlist}><HeartOutlined className="text-info" /> <br /> Add to wishlist</a>,
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
