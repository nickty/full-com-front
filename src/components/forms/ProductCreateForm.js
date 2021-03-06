import React from 'react'
import { Select } from 'antd'
const { Option } = Select

const ProductCreateForm = ({setValues, handleChange, handleSubmit, values, handleCategoryChange, subOptions, showSubs}) => {

    const subs = values.subs
    return (
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
                            <label for="category">Category</label>
                            <select name="category" className="form-control" onChange={handleCategoryChange}>
                                <option disabled>Select Category</option>
                                {values.categories.length > 0 && values.categories.map((cat) => (
                                    <option value={cat._id} key={cat._id}>{cat.name}</option>
                                ))}
                                
                            </select>
                        </div>
                       { showSubs && <div className="form-group">
                            <label for="category">Sub Category</label>
                           <Select
                            mode="multiple"
                            placeholder="Please select"
                            style={{width: '100%'}}
                            value={subs}
                            onChange={value=>setValues({...values, subs: value })}
                           >
                               {subOptions.length && subOptions.map((s) => (
                                   <Option value={s._id} key={s._id}>{s.name}</Option>
                               ))}
                               
                           </Select>
                        </div>}
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
    )
}

export default ProductCreateForm
