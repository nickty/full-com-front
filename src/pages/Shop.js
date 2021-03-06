import React, { useEffect, useState } from 'react'
import { fetchProductByFilter, getProductsByCount } from '../functions/product'
import { getCategories } from '../functions/category'
import ProductCard from '../components/cards/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Slider, Checkbox, Radio } from 'antd'
import { getSubs } from '../functions/sub'
import { DollarOutlined, DownSquareOutlined, RadiusUpleftOutlined, StarOutlined } from '@ant-design/icons'
import Star from '../components/forms/Star'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0,0])
    const [ok, setOk] = useState(false)
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [sub, setSub] = useState('')

    const [brands, setBrands] = useState(["Apple", "HP", "Nokia", "Yamaha", "Microsoft"])
    const [brand, setBrand] = useState('')
    const [colors, setColors] = useState(["Black", "Brown", "Silver", "White", "Blue"])
    const [color, setColor] = useState('')

    const [shipping, setShipping] = useState('')

    const [star, setStar] = useState('')

    const [categoryIds, setCategoryIds] = useState([])

    const dispatch = useDispatch()

    const { search } = useSelector(state => state)
    const { text } = search

    useEffect(() => {
        loadAllProducts()
        //fetch categorygoires
        getCategories().then( res => setCategories(res.data))
        //fetch sub categories
        getSubs().then(res => setSubs(res.data))
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
            if(!text){
                loadAllProducts()
            }
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
        setSub('')
        setBrand('')
        setColor('')
        setShipping('')
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
        setSub('')
        setBrand('')
        setColor('')
        setStar("")
        setShipping('')
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
        setSub('')
        setBrand('')
        setColor('')
        setShipping('')
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

    //6. Show product by subcategories
    const showSubs = () => subs.map(s => <div key={s._id} style={{cursor: "pointer"}} className="p-1 m-1 badge badge-secondary" onClick={() => handleSubmit(s)}>{s.name}</div>)

    const handleSubmit = sub => {
        // console.log('Sub', s)
        setSub(sub)

        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""}
        })
        setPrice([0,0])
        setCategoryIds([])
        setStar('')
        setBrand('')
        setColor('')
        setShipping('')
        fetchProducts({sub})
    }

    //7. show product based on brand name
    const showBrands = () => brands.map(b => <Radio className="pt-3 pb-3 pl-5 pr-5" value={b} name={b} checked={b===brand} onChange={handleBrand}>{b}</Radio> )

    const handleBrand = (e) => {
        setSub('')

        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""}
        })
        setPrice([0,0])
        setCategoryIds([])
        setStar('')
        setBrand(e.target.value)
        setColor('')
        setShipping('')
        fetchProducts({brand: e.target.value})
    }

    //8. show product based on color
    const showColors = () => colors.map(b => <Radio className="pt-3 pb-3 pl-5 pr-5" value={b} name={b} checked={b===color} onChange={handleColor}>{b}</Radio> )

    const handleColor = (e) => {
        setSub('')

        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""}
        })
        setPrice([0,0])
        setCategoryIds([])
        setStar('')
        setBrand('')
        setShipping('')
        setColor(e.target.value)

        fetchProducts({color: e.target.value})   
    }

    // 9. show products based on shipping yes or no 
    const showShipping = () => (
        <>
            <Checkbox className="pb-2 pl-4 pr-4" onChange={handleShippingChange} value="yes" checked={shipping === "yes"}>Yes</Checkbox>
            <Checkbox className="pb-2 pl-4 pr-4" onChange={handleShippingChange} value="no" checked={shipping === "no"}>No</Checkbox>
        </>
    )
    const handleShippingChange = (e) => {
        setSub('')

        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: ""}
        })
        setPrice([0,0])
        setCategoryIds([])
        setStar('')
        setBrand('')
        setColor('')
        setShipping(e.target.value)
        fetchProducts({shipping: e.target.value})   
    } 

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3 p-2">
                    <h4>Search/Filter</h4>

                    <Menu mode="inline" defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}>
                    
                        <Menu.SubMenu key="1" title={<span className="h6"><DollarOutlined /> Price</span>}>
                            {/* price */}
                            <div>
                                <Slider max={5999} onChange={handleSlider} className="ml-4 mr-4" tipFormatter={(v) => `$${v}`} range value={price} />
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="2" title={<span className="h6"><DownSquareOutlined /> Categories</span>}>
                            
                            <div style={{marginTop: "-10px"}}>
                                {showCategories()}
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="3" title={<span className="h6"><StarOutlined /> Rating</span>}>
                          
                            <div style={{marginTop: "-10px"}} className="pt-2">
                                {showStars()}
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="4" title={<span className="h6"><DownSquareOutlined /> Sub-Categories</span>}>
                           
                            <div style={{marginTop: "-10px"}} className="pl-4 pr-4">
                                {showSubs()}
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="5" title={<span className="h6"><DownSquareOutlined /> Brands</span>}>
                            {/* brands */}
                            <div style={{marginTop: "-10px"}} className="pr-4">
                                {showBrands()}
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="6" title={<span className="h6"><DownSquareOutlined /> Colors</span>}>
                            {/* brands */}
                            <div style={{marginTop: "-10px"}} className="pr-4">
                                {showColors()}
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="7" title={<span className="h6"><DownSquareOutlined /> Shipping</span>}>
                            {/* brands */}
                            <div style={{marginTop: "-10px"}} className="pr-4">
                                {showShipping()}
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
