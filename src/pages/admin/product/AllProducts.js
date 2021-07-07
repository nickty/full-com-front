import React, { useEffect, useState } from 'react'
import { getProductsByCount } from '../../../functions/product'
import AdminNav from '../../../components/nav/AdminNav'
import AdminProductCard from '../../../components/cards/AdminProductCard'

const AllProducts = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState([])

    useEffect(() => {

        loadAllProducts()

    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(100)
        .then(res => {
            setProducts(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>All Products</h4>)}

                    <div className="row">
                        {products.map(product => (
                            <div key={product._id} className="col-md-4 pb-3">
                                <AdminProductCard product={product} key={product._id} />
                            </div>
                            
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts
