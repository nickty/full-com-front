import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import { createCategory, getCategories, removeCategory } from '../../../functions/category'
import { Link } from 'react-router-dom'

const CategoryCreate = () => {
const [name, setName] = useState('')
const [loading, setLoading] = useState(false)
const [categories, setCategories] = useState([])

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
    const createCtegoryForm = () => {
        return <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="name">Name</label>
                <input placeholder="Type category name" className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} autoFocus required />
                <button type="submit" disabled={!name} className="btn btn-primary mt-3">Submit</button>
            </div>
        </form>
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
                    {loading ? <LoadingOutlined /> : createCtegoryForm()}
                    <hr />
                    {categories.map( cat => (<div className="alert alert-primary" key={cat._id}>
                        {cat.name} <span className="float-right" onClick={() => handleRemove(`${cat.slug}`)}><DeleteOutlined /></span><Link to={`/admin/category/${cat.slug}`}><span className="mr-3 float-right"><EditOutlined /></span></Link>
                    </div>))}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate