import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserNav from '../../components/nav/UserNav'
import { getWishlist, removeWishlist } from '../../functions/user';
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons';

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const dispatch = useDispatch()
    const { user } = useSelector(state => state)

    useEffect(() => {
        loadWishlist()
    }, [])

    const loadWishlist = () => getWishlist(user.token).then(res => {
        setWishlist(res.data.wishlist)
    })

    const handleRemove = productId  => removeWishlist(productId, user.token).then(res => {
        loadWishlist()
    })

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <h4>Wishlist</h4>

                    {wishlist.map(p => (
                        <div key={p._id} className="alert alert-secondary">
                            <Link to={`/product/${p.slug}`}>{p.title}</Link>
                            <span className="alert-danger float-right" onClick={() => handleRemove(p._id)}><DeleteOutlined /></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Wishlist
