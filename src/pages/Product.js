import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SingleProduct from '../components/cards/SingleProduct'
import { getProduct, productStar } from '../functions/product'

const Product = ({match}) => {
    const [product, setProduct] = useState({})
    const [star, setStar] = useState(0)

    const { user } = useSelector(state => state)

    const { slug } = match.params

    useEffect(() => {
        loadSingleProduct()
    }, [slug])

    useEffect(() => {
        if(product.ratings && user) {
            let existingRatingObject = product.ratings.find(el => 
                el.postedBy.toString() === user._id.toString()
                )

                existingRatingObject && setStar(existingRatingObject.star)
        }
    })

    const onStartClick = (newRating, name) => {
        setStar(newRating)

        productStar(name, newRating, user.token)
        .then(res => {
            console.log(res.data)
            loadSingleProduct() //if you want to show the udpated rating
        })
    }

    const loadSingleProduct = () => {
        getProduct(slug).then((res)=> setProduct(res.data))
    }
    return (
        <div className="containter-fluid">
            <div className="row pt-4">
                <SingleProduct product={product} onStartClick={onStartClick} star={star} />
                {/* {JSON.stringify(product)} */}
            </div>

            <div className="row p-5">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                        <h4>Related Products</h4>
                        
                    <hr />
                </div>
            </div>
           
        </div>
    )
}

export default Product
