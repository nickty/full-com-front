import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import { createCategory, getCategories, removeCategory } from '../../../functions/category'
import { Link } from 'react-router-dom'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const CategoryCreate = () => {
const [name, setName] = useState('')
const [loading, setLoading] = useState(false)
const [categories, setCategories] = useState([])

//step 1
const [keyword, setKeyword] = useState('')

//step 3
const handleSearchChange = (e) => {
    e.preventDefault()

    setKeyword(e.target.value.toLowerCase())
}

const searched = keyword => c => c.name.toLowerCase().includes(keyword)

const { user } = useSelector(state=>state)

useEffect(() => {
    loadCategories()
},[])

const loadCategories = () => getCategories().then(c => setCategories(c.data))

    const handleSubmit = e => {
        e.preventDefault()

        setLoading(true)

        createCategory({name}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is created`)
            loadCategories()
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }
   

    const handleRemove = async (slug) =>{
        if(window.confirm("Delete?")){
            setLoading(true)
            removeCategory(slug, user.token)
            .then(res => {
                setLoading(false)
                toast.error(`"${res.data.name}" deleted`)
                loadCategories()
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                if(err.response.status === 400) toast.error(err.response.data)
            })
        }

    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Create Category</h4>
                    {loading ? <LoadingOutlined /> : <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />}

                   <hr />
                   <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                    {/* step 5  */}
                    {categories.filter(searched(keyword)).map( cat => (<div className="alert alert-primary" key={cat._id}>
                        {cat.name} <span className="float-right" onClick={() => handleRemove(`${cat.slug}`)}><DeleteOutlined /></span><Link to={`/admin/category/${cat.slug}`}><span className="mr-3 float-right"><EditOutlined /></span></Link>
                    </div>))}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate