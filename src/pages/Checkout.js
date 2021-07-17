import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart } from '../functions/user'

const Checkout = () => {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)

    const dispatch = useDispatch()
    const { user } = useSelector(state => state)

    useEffect(() => {
       getUserCart(user.token)
       .then( res => {
        //    console.log('user  cart res', res.data)

        setProducts(res.data.products)
        setTotal(res.data.cartTotal)
       })
    }, [])


    const saveAddressToDB = () => {

    }
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>

                <button type="" onClick={saveAddressToDB}>Save</button>
                <hr />
                <h4>Got Coupon?</h4>
                coupon input and apploy button
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                {JSON.stringify(products)}
                <hr />
                <p>Products x</p>
                <hr />
                <p>List of Products</p>
                <p>Cart total: $x</p>

                <div className="row">
                    <div className="col-md-6">
                        <button type="">Place Order</button>
                    </div>
                    <div className="col-md-6">
                        <button type="">Empty Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
