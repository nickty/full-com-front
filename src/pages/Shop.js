import React, { useEffect, useState } from 'react'
import { fetchProductByFilter, getProductsByCount } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Slider } from 'antd'
import { DollarOutlined } from '@ant-design/icons'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0,0])
    const [ok, setOk] = useState(false)

    const dispatch = useDispatch()

    const { search } = useSelector(state => state)
    const { text } = search

    useEffect(() => {
        loadAllProducts()
    }, [])

    const fetchProducts = (arg) => {
        fetchProductByFilter(arg)
        .then(res => {
            setProducts(res.data)
        })
    }

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

   

    //3. load product based on price range
    useEffect(() => {
        console.log("ok to request")
        fetchProducts({price})
    }, [ok])

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""}
        })
        setPrice(value)
        setTimeout(() => {
           setOk(!ok) 
        }, 300);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <h4>Search/Filter</h4>

                    <Menu mode="inline" defaultOpenKeys={["1", "2"]}>
                        <Menu.SubMenu key="1" title={<span className="h6"><DollarOutlined /> Price</span>}>
                            <div className="">
                                <Slider max={5999} onChange={handleSlider} className="ml-4 mr-4" tipFormatter={(v) => `$${v}`} range value={price} />
                            </div>
                        </Menu.SubMenu>
                    </Menu>
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
