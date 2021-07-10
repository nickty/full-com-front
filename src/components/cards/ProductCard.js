import React from 'react'

const ProductCard = ({product}) => {
    return (
        <div>
            {JSON.stringify(product.title)}
        </div>
    )
}

export default ProductCard
