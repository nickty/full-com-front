import React from 'react'
import { useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'

const initialState = {
    title: '',
    desicription: '',
    price: '',
    categories: [],
    category:'',
    subs: [],
    shipping: '',
    quanitity: '', 
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"], 
    brands: ["Apple", "HP", "Nokia", "Yamaha", "Microsoft"], 
    color: '',
    brand: ''
    }

const ProductCreate = () => {
    const [values, setValues] = useState(initialState)

    const handleChange = () => {

    }

    const handleSubmit = e => {
        e.preventDefault()
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
                            <input onChange={handleChange} type="text" name="description" value={values.desicription} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="description">Price</label>
                            <input onChange={handleChange} type="text" name="price" value={values.price} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="description">Shipping</label>
                            <select name="shipping" className="form-control" onChange={handleChange}>
                                <option disabled>Please select</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                                
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="description">Quanitity</label>
                            <input onChange={handleChange} type="number" name="quantity" value={values.quanitity} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label for="color">Colors</label>
                            <select name="color" className="form-control" onChange={handleChange}>
                                <option disabled>Please select</option>
                                {values.colors.map(c => <option key={c}>{c}</option>)}
                                
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="color">Brands</label>
                            <select name="color" className="form-control" onChange={handleChange}>
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
