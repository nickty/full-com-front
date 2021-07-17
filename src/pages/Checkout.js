import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { emptyUserCart, getUserCart } from '../functions/user'

const Checkout = () => {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)

    const dispatch = useDispatch()
    const { user } = useSelector(state => state)

    useEffect(() => {
       getUserCart(user.token)
       .then( res => {
           console.log('user  cart res', res.data)

        setProducts(res.data.products)
        setTotal(res.data.cartTotal)
       })
    }, [])


    const emptyCart = () => {
        if(typeof window !== undefined){
            localStorage.removeItem('cart')
        }

        dispatch({
            type: 'ADD_TO_CART', 
            payload: []
        })

        emptyUserCart(user.token)
        .then(res => {
            setProducts([])
            toast.success('Cart is empty now, Continue shopping again!')
            setTotal('')
        })
    }


    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <hr />
                <h4>Got Coupon?</h4>
                coupon input and apploy button
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                 <hr />
                <p>Products {products.length}</p>
                <hr />
                {products.map((p,i)=> (
                    <div key={i}>
                        <p>{p.product.title} ({p.color}) x ({p.count}) = {p.product.price * p.count}</p>
                    </div>
                ))}
                <hr />
                <p>Cart Total: {total}</p>
               

                <div className="row">
                    <div className="col-md-6">
                        <button type="" className="btn btn-info">Place Order</button>
                    </div>
                    <div className="col-md-6">
                        <button disabled={!products.length} onClick={emptyCart} type="" className="btn btn-info">Empty Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
