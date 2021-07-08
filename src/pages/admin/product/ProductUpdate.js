import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import { getProduct } from '../../../functions/product'
import { useEffect } from 'react'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'

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

    const {user} = useSelector(state => state)

    const { slug } = match.params

    useEffect(() => {
        loadingProduct()
    }, [])

    const loadingProduct = () => {
        getProduct(slug)
        .then(p => {
            // console.log(p)
            setValues({...values, ...p.data})
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

                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
