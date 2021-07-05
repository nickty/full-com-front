import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import { createProduct } from '../../../functions/product'

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

    const {user} = useSelector(state => state)

    const handleChange = (e) => {
        setValues({
            ...values, [e.target.name] : e.target.value
        })
    }

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
            if(err.response.status === 400) toast.error(err.response.data)
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

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label for="title">Title</label>
                            <input onChange={handleChange} type="text" name="title" value={values.title} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="description">Description</label>
                            <input onChange={handleChange} type="text" name="description" value={values.description} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="shipping">Price</label>
                            <input onChange={handleChange} type="text" name="price" value={values.price} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="shipping">Shipping</label>
                            <select name="shipping" className="form-control" onChange={handleChange}>
                                <option disabled>Please select</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                                
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="description">Quantity</label>
                            <input onChange={handleChange} type="number" name="quantity" value={values.quantity} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label for="color">Colors</label>
                            <select name="color" className="form-control" onChange={handleChange}>
                                <option disabled>Please select</option>
                                {values.colors.map(c => <option key={c}>{c}</option>)}
                                
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="brand">Brands</label>
                            <select name="brand" className="form-control" onChange={handleChange}>
                                <option disabled>Please select</option>
                                {values.brands.map(c => <option key={c}>{c}</option>)}
                                
                            </select>
                        </div>

                        <button type="submit" className="btn btn-info">Save</button>
                        
                    </form>


                </div>
            </div>
        </div>
    )
}

export default ProductCreate
