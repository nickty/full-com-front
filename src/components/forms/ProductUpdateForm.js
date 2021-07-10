import React from 'react'
import { Select } from 'antd'
import { getCategory } from '../../functions/category'
const { Option } = Select

const ProductUpdateForm = ({selectedCategory,arrayObSubIds, setArrayObSubIds, categories, category, subOptions,setValues, handleChange, handleSubmit, values, handleCategoryChange}) => {

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
                            <label for="shipping">Price</label>
                            <input onChange={handleChange} type="text" name="price" value={values.price} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="shipping">Shipping</label>
                            <select value={values.shipping === 'yes' ? 'yes' : 'no'} name="shipping" className="form-control" onChange={handleChange}>
                                <option disabled>Please select</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                                
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="category">Category</label>
                            <select value={selectedCategory ? selectedCategory : values.category._id} name="category" className="form-control" onChange={handleCategoryChange}>
                                
                                {categories.length > 0 && categories.map((cat) => (
                                    <option value={cat._id} key={cat._id}>{cat.name}</option>
                                ))}
                                
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="category">Sub Category</label>
                           <Select
                            mode="multiple"
                            placeholder="Please select"
                            style={{width: '100%'}}
                            value={arrayObSubIds}
                            onChange={value=>setArrayObSubIds(value)}
                           >
                               {subOptions.length && subOptions.map((s) => (
                                   <Option value={s._id} key={s._id}>{s.name}</Option>
                               ))}
                               
                           </Select>
                        </div>

                        <div className="form-group">
                            <label for="description">Quantity</label>
                            <input onChange={handleChange} type="number" name="quantity" value={values.quantity} className="form-control" />
                        </div>

                        <div className="form-group">
                            <label for="color">Colors</label>
                            <select name="color" value={values.color} className="form-control" onChange={handleChange}>
                                <option disabled>Please select</option>
                                {values.colors.map(c => <option key={c}>{c}</option>)}
                                
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="brand">Brands</label>
                            <select name="brand" value={values.brands} className="form-control" onChange={handleChange}>
                                <option disabled>Please select</option>
                                {values.brands.map(c => <option key={c}>{c}</option>)}
                                
                            </select>
                        </div>

                        <button type="submit" className="btn btn-info">Submit</button>
                        
                    </form>
    )
}

export default ProductUpdateForm
