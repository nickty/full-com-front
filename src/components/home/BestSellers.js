import React, { useEffect, useState } from 'react'
import LoadingCard from '../cards/LoadingCard'
import ProductCard from '../cards/ProductCard'
import { getProducts } from '../../functions/product'

const BestSellers = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadingAllProducts()
    }, [])

    const loadingAllProducts = () => {
        setLoading(true)
        getProducts('sold', 'desc', 3).then((res) => {
            setProducts(res.data)
            setLoading(false)
        })
    }
    return (
        <div>
             <div className="container">

                {loading ? <LoadingCard count={3} /> : (
                     <div className="row">
                        {products.map(p => (
                            <div className="col-md-4">
                                <ProductCard key={p._id} product={p}/>
                            </div>
                        ))}
                    </div>
                )}
             </div>
            
        </div>
    )
}

export default BestSellers
