import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import { getCategory, updateCategory } from '../../../functions/category'


const CategoryUpdate = ({history, match}) => {
const [name, setName] = useState('')
const [loading, setLoading] = useState(false)

const { user } = useSelector(state=>state)

useEffect(() => {
    loadCategory()
},[])

const loadCategory = () => getCategory(match.params.slug).then(c => setName(c.data.name))

    const handleSubmit = e => {
        e.preventDefault()

        setLoading(true)

        updateCategory(match.params.slug, {name}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is updated`)
            history.push('/admin/category')
            
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

  
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Create Category</h4>
                    {loading ? <LoadingOutlined /> : createCtegoryForm()}
                   
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate