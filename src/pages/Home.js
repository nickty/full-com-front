import React, { useEffect, useState } from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import LoadingCard from '../components/cards/LoadingCard'
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
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
            <Jumbotron text={['New Arrivals', 'Best Sellers', 'Latest Products']} />
            </div>
            

             {loading ? (<h4 className="text-danger">Loading</h4>) : (<h4>All Products</h4>) }
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

export default Home
