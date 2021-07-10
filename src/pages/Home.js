import React, { useEffect, useState } from 'react'
import ProductCard from '../components/cards/ProductCard'
import { getProductsByCount } from '../functions/product'

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadingAllProducts()
    }, [])

    const loadingAllProducts = () => {
        setLoading(true)
        getProductsByCount(3).then((res) => {
            setProducts(res.data)
            setLoading(false)
        })
    }
    return (
        <div>
             {loading ? (<h4 className="text-danger">Loading</h4>) : (<h4>All Products</h4>) }
             <div className="container">
                 <div className="row">
                    {products.map(p => (
                        <div className="col-md-4">
                            <ProductCard key={p._id} product = {p}/>
                        </div>
                    ))}
                 </div>
             </div>
            
        </div>
    )
}

export default Home
