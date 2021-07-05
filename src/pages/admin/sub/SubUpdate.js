import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CategoryForm from '../../../components/forms/CategoryForm'
import AdminNav from '../../../components/nav/AdminNav'
import { getCategory } from '../../../functions/category'
import { getSub, updateSub } from '../../../functions/sub'


const SubUpdate = ({history, match}) => {
const [name, setName] = useState('')
const [loading, setLoading] = useState(false)
const [parent, setParent] = useState('')
const [category, setCategory] = useState('')
const [categories, setCategories] = useState([])

const { user } = useSelector(state=>state)

useEffect(() => {
    loadCategory()
    loadSub()
},[])

const loadCategory = () => getCategory(match.params.slug).then(c => setName(c.data))

const loadSub = () => getSub(match.params.slug).then(c => {
    setName(c.data.name)
    setParent(c.data.parent)
})

    const handleSubmit = e => {
        e.preventDefault()

        setLoading(true)

        updateSub(match.params.slug, {name, parent}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is updated`)
            history.push('/admin/sub')
            
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }


  
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <div className="form-group">
                        <label for="category">Parent Category</label>
                        <select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
                            <option disabled>Select Category</option>
                            {categories.length > 0 && categories.map((cat) => (
                                <option value={cat._id} key={cat._id} selected={cat._id===parent}>{cat.name}</option>
                            ))}
                            
                        </select>
                    </div>
                    <h4>Update Sub-category</h4>
                    {loading ? <LoadingOutlined /> : <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />}
                   
                </div>
            </div>
        </div>
    )
}

export default SubUpdate