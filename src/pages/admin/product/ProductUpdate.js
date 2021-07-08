import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import { getProduct } from '../../../functions/product'
import { useEffect } from 'react'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'

const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category:'',
    subs: [],
    shipping: '',
    quantity: '', 
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"], 
    brands: ["Apple", "HP", "Nokia", "Yamaha", "Microsoft"], 
    color: '',
    brand: ''
    }

const ProductUpdate = ({match}) => {

    const [values, setValues] = useState(initialState)
    const [ subOptions, setSubOptions ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ arrayObSubIds, setArrayObSubIds ] = useState([])

    const {user} = useSelector(state => state)

    const { slug } = match.params

    useEffect(() => {
        loadingProduct()
        loadCategories()
    }, [slug])

    const loadingProduct = () => {
        getProduct(slug)
        .then(p => {
            // console.log(p)
            setValues({...values, ...p.data})

            getCategorySubs(p.data.category._id)
            .then(res => {
                setSubOptions(res.data)
            })
            let arr =[]
            p.data.subs.map(s => {
                arr.push(s._id)
            })
            console.log(arr)
            setArrayObSubIds(prev => arr)
        })
    }

    const loadCategories = () => getCategories().then(c => {
        setCategories(c.data)
    })

    const handleChange =(e) =>{
        
        setValues({...values, [e.target.name] : e.target.value})

    }

    const handleSubmit = () => {
        
    }

    const handleCategoryChange = e => {
        e.preventDefault()
        console.log('click', e.target.value)
        setValues({...values, subs: [], category : e.target.value})

        getCategorySubs(e.target.value)
        .then(res => {
            setSubOptions(res.data)
            console.log(res.data)
        })
     
    }
   
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Update Product</h4>
                    <hr />

                    {JSON.stringify(values)}

                    <ProductUpdateForm 
                    handleCategoryChange = {handleCategoryChange}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    setValues={setValues}
                    values={values}
                    categories={categories}
                    subOptions={subOptions}
                    arrayObSubIds={arrayObSubIds}
                    setArrayObSubIds={setArrayObSubIds}
                    />

                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
