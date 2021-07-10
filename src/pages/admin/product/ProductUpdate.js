import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import { getProduct, updateProduct } from '../../../functions/product'
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

const ProductUpdate = ({match, history}) => {

    const [values, setValues] = useState(initialState)
    const [ subOptions, setSubOptions ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ arrayObSubIds, setArrayObSubIds ] = useState([])
    const [ selectedCategory, setSelectedCategory ] = useState('')
    const [loading, setLoading] = useState(false)

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

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setLoading(true)

        values.subs = arrayObSubIds
        values.category = selectedCategory ? selectedCategory : values.category 

        updateProduct(slug, values, user.token)
        .then(res => {
            setLoading(false)
            toast.success(`"${res.data.title}" is updated`)
            history.push("/admin/products")
        })
        .catch(err => {
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }

    const handleCategoryChange = e => {
        e.preventDefault()
        console.log('click', e.target.value)
        setValues({...values, subs: []})

        setSelectedCategory(e.target.value)

        getCategorySubs(e.target.value)
        .then(res => {
            setSubOptions(res.data)
            console.log(res.data)
        })

        if(values.category._id === e.target.value){
            loadingProduct();
        }

        setArrayObSubIds([])
     
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

                    {/* {JSON.stringify(values)} */}
                    <div className="p-3">
                        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
                    </div>

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
                    selectedCategory={selectedCategory}
                    />

                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
