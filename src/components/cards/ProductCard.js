import React, { useState } from 'react'
import productImage from '../../images/product.png'
import {Card, Tooltip } from 'antd'
import { EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { showAverage } from '../../functions/rating'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'


const { Meta } = Card

const ProductCard = ({product}) => {
    const [tooltip, setTooltip] = useState('Click to add to cart')

    //redux
    const {user, cart} = useSelector(state => state)
    const dispatch = useDispatch()

    const { title, description, price, images, slug } = product

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
        }
    }
    return (
       <>
       {product && product.ratings && product.ratings.length > 0 ? 
       showAverage(product) : <div className="text-center p-4">No rating yet</div>}
        <Card cover={
            <img src={images && images.length ? images[0].url : productImage } style={{height: "150px", objectFit: "cover"}} />
        }
        actions={[
            <Link to={`/product/${slug}`}><EyeOutlined className="text-info" /> <br/> View Product</Link>,<Tooltip title={tooltip}> <a onClick={handleAddtocart}><ShoppingCartOutlined className="text-warning"/> <br/> Add to cart</a></Tooltip>
        ]}
        >
            <Meta title={`${title} $${price}`} description={`${description && description.substring(0, 40)}...`} />
        </Card>
        </>

    )
}

export default ProductCard
