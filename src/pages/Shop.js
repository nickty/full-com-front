import React, { useEffect, useState } from 'react'
import { fetchProductByFilter, getProductsByCount } from '../functions/product'
import { getCategories } from '../functions/category'
import ProductCard from '../components/cards/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Slider, Checkbox } from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons'
import Star from '../components/forms/Star'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0,0])
    const [ok, setOk] = useState(false)
    const [categories, setCategories] = useState([])

    const [star, setStar] = useState('')

    const [categoryIds, setCategoryIds] = useState([])

    const dispatch = useDispatch()

    const { search } = useSelector(state => state)
    const { text } = search

    useEffect(() => {
        loadAllProducts()
        //fetch categorygoires
        getCategories().then( res => setCategories(res.data))
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
        setCategoryIds([''])
        setPrice(value)
        setStar("")
        setTimeout(() => {
           setOk(!ok) 
        }, 300);
    }

    //4. load products based on category 
    // show categories in a list of checkbox


    const showCategories = () => (
        categories.map((c) => <div key={c._id}>
            <Checkbox checked={categoryIds.includes(c._id)} onChange={handleCheck} className="pb-2 pl-4 pr-4" value={c._id} name="category">{c.name}</Checkbox>
            <br />
        </div>)
    )

    const handleCheck = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""}
        })
        setPrice([0,0])
        setStar("")
        // console.log(e.target.value)
        let inTheState = [...categoryIds]
        let justChecked = e.target.value
        let foundInTheState = inTheState.indexOf(justChecked)   // true or -1

        //indexOf method ?? if not found returns -1 else return index
        if(foundInTheState === -1){
            inTheState.push(justChecked)
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1)
        }
        setCategoryIds(inTheState)
        // console.log(inTheState)

        fetchProducts({category: inTheState})
    }

    // 5. show product by star rating
    const handleStarClick = (num) => {
        // console.log(num)
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""}
        })
        setPrice([0,0])
        setCategoryIds([])
        setStar(num)
        fetchProducts({stars: num})
    }
    const showStars = () => {
        return <div className="pr-4 pl-4 pb-2">
            <Star starClick={handleStarClick}
            numberOfStars={5} /><br />
            <Star starClick={handleStarClick}
            numberOfStars={4} /> <br />
            <Star starClick={handleStarClick}
            numberOfStars={3} /><br />
            <Star starClick={handleStarClick}
            numberOfStars={2} /><br />
            <Star starClick={handleStarClick}
            numberOfStars={1} />
        </div>
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 p-2">
                    <h4>Search/Filter</h4>

                    <Menu mode="inline" defaultOpenKeys={["1", "2", "3"]}>
                    
                        <Menu.SubMenu key="1" title={<span className="h6"><DollarOutlined /> Price</span>}>
                            {/* price */}
                            <div>
                                <Slider max={5999} onChange={handleSlider} className="ml-4 mr-4" tipFormatter={(v) => `$${v}`} range value={price} />
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="2" title={<span className="h6"><DownSquareOutlined /> Categories</span>}>
                            {/* Categories */}
                            <div style={{marginTop: "-10px"}}>
                                {showCategories()}
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="3" title={<span className="h6"><StarOutlined /> Rating</span>}>
                            {/* Categories */}
                            <div style={{marginTop: "-10px"}}>
                                {showStars()}
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
