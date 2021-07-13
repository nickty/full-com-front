import React, { useEffect, useState } from 'react'
import { getProductsByCount } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    // const {} = useSelector(state => state)

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(12)
        .then(p => {
            setProducts(p.data)
            setLoading(false)
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    search menu
                </div>
                <div className="col-md-9">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : 
                        <h4 className="text-danger">Products</h4>     

                    }

                    <div className="row">
                        {products.map(p => (
                            <div key={p._id} className="col-md-4">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
