import React, { useEffect, useState } from 'react'
import { fetchProductByFilter, getProductsByCount } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
import { useSelector } from 'react-redux'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const { search } = useSelector(state => state)
    const { text } = search

    useEffect(() => {
        loadAllProducts()
    }, [])

    // 1. load product on page load by default
    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(12)
        .then(p => {
            setProducts(p.data)
            setLoading(false)
        })
    }

    // 2. load product on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({query: text})
        }, 300)
       return () => clearTimeout(delayed)
    }, [text])

    const fetchProducts = (arg) => {
        fetchProductByFilter(arg)
        .then(res => {
            setProducts(res.data)
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
