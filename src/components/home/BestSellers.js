import React, { useEffect, useState } from 'react'
import LoadingCard from '../cards/LoadingCard'
import ProductCard from '../cards/ProductCard'
import { getProducts, getProductsCount } from '../../functions/product'
import { Pagination } from 'antd'

const BestSellers = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [productsCount, setProductsCount] = useState(0)

    useEffect(() => {
        loadingAllProducts()
    }, [page])

    useEffect(() => {
        getProductsCount().then(res => setProductsCount(res.data))
    }, [])

    const loadingAllProducts = () => {
        setLoading(true)
        getProducts('sold', 'desc', page).then((res) => {
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
             <div className="row">
                <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                <Pagination current={page} total={(productsCount / 3) * 10} onChange={value => setPage(value)} />
                </nav>
                
             </div>
            
        </div>
    )
}

export default BestSellers
