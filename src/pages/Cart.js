import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {

    const { user, cart } = useSelector(state => state)

    const dispatch = useDispatch()

    return (
        <div className="container-fluid">
            <h4>Cart</h4>
            {JSON.stringify(cart)}
        </div>
    )
}

export default Cart
