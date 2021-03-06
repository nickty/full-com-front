import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { useEffect } from 'react'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'

const initialState = {
    title: 'Mackbook',
    description: 'this is new backbook best apple product',
    price: '45000',
    categories: [],
    category:'',
    subs: [],
    shipping: 'yes',
    quantity: '150', 
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"], 
    brands: ["Apple", "HP", "Nokia", "Yamaha", "Microsoft"], 
    color: '',
    brand: ''
    }

const ProductCreate = () => {
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState('')
    const [showSubs, setShowSubs] = useState(false)
    const [loading, setLoading] = useState(false)

    const {user} = useSelector(state => state)

    const handleChange = (e) => {
        setValues({
            ...values, [e.target.name] : e.target.value
        })
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
        setShowSubs(true)
    }

    useEffect(()=>{
        loadCategories()
    }, [])

    const loadCategories = () => getCategories().then(c => setValues({...values, categories: c.data}))

    const handleSubmit = e => {
        e.preventDefault()

        createProduct(values, user.token)
        .then(res => {
            console.log(res)
            window.alert(`"${res.data.title}" is created`)
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
            // if(err.response.status === 400) toast.error(err.response.data)
            toast.error(err.response.data.err)
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Create Product</h4>
                    <hr />

                    <div className="p-3">
                        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
                    </div>

                   <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange} values={values}
                   handleCategoryChange={handleCategoryChange}
                   subOptions={subOptions}
                   showSubs={showSubs}
                   setValues={setValues}
                   />


                </div>
            </div>
        </div>
    )
}

export default ProductCreate
