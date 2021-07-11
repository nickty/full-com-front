import React, { useEffect, useState } from 'react'
import SingleProduct from '../components/cards/SingleProduct'
import { getProduct } from '../functions/product'

const Product = ({match}) => {
    const [product, setProduct] = useState({})

    const { slug } = match.params

    useEffect(() => {
        loadSingleProduct()
    }, [slug, match])

    const loadSingleProduct = () => {
        getProduct(slug).then((res)=> setProduct(res.data))
    }
    return (
        <div className="containter-fluid">
            <div className="row pt-4">
                <SingleProduct product={product} />
                {/* {JSON.stringify(product)} */}
            </div>

            <div className="row">
                related product
            </div>
           
        </div>
    )
}

export default Product
