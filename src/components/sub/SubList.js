import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getSubs } from '../../functions/sub' 

const SubList = () => {
    const [subs, setSubs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getSubs()
        .then(c => {
            setSubs(c.data)
            setLoading(false)
        })
    }, [])

    const showSubs = () => subs.map(c => <div key={c._id} className="btn btn-primary m-3">
        <Link className="text-white" to={`/sub/${c.slug}`}>{c.name}</Link>
    </div>)

    return (
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center">Loading...</h4>) : showSubs()}
            </div>
        </div>
    )
}

export default SubList
