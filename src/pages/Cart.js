import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {

    const { user, cart } = useSelector(state => state)

    const dispatch = useDispatch()

    const getTotal= () => {
        return cart.reduce((cv, nv) => {
            return cv + nv.count * nv.price
        }, 0)
    }

    return (
        <div className="container-fluid">
          
            <div className="row">
                <div className="col-md-8">
                <h4>Cart / {cart.length}</h4>
                    {!cart.length ? <h4>No product in cart.  <Link to="/shop">Contiue shoppong</Link></h4> : (
                        "show cart items"
                    )}
                </div>
                <div className="col-md-4">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Products</p>
                        {cart.map((c,i) => (
                            <div key={i}>
                                <p>{c.title} x {c.count} = ${c.price * c.count}</p>
                            </div>
                        ))}

                        <hr />
                        Total : <b>${getTotal()}</b>
                        <hr />


                        {
                            user ? (
                                <button className="btn btn-sm btn-primary mt-2">Procced to checkout</button>
                            ) : (
                                <button className="btn btn-sm btn-primary mt-2">Login to checkout</button>
                            )
                        }
                </div>
            </div>
        </div>
    )
}

export default Cart
