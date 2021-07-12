import React, { useEffect, useState } from 'react'
import { getCategory } from '../../functions/category'

const CategoryHome = ({match}) => {
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const { slug } = match.params

    useEffect(() => {
        setLoading(true)
        getCategory(slug)
        .then(res => {
            setCategory(res.data)
        })
    }, [])
    return (
        <div>
            <p>{JSON.stringify(category)}</p>
        </div>
    )
}

export default CategoryHome
