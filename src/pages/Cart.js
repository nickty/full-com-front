import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout'
import { userCart } from '../functions/user'

const Cart = ({history}) => {

    const { user, cart } = useSelector(state => state)

    const dispatch = useDispatch()

    const getTotal= () => {
        return cart.reduce((cv, nv) => {
            return cv + nv.count * nv.price
        }, 0)
    }

    const saveOrderToDb = () => {
        
        // console.log("cart", JSON.stringify(cart, null, 4))
        userCart(cart, user.token)
        .then(res => {
            console.log('response form cart', res)
            if(res.data.ok) history.push("/checkout")
        })
        .catch(err => console.log("cart save error", err))
        
    }

    const showCartItems = () => {
        return <table className="table table-bordered">
            <thead className="thead-light">
            <tr>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
                <th scope="col">Count</th>
                <th scope="col">Shipping</th>
                <th scope="col">Remove</th>
            </tr>
            </thead>
            {cart.map((p) => (
                <ProductCartInCheckout key={p._id} p={p} />
            ))}
        </table>
    }

    return (
        <div className="container-fluid">
          
            <div className="row">
                <div className="col-md-8">
                <h4>Cart / {cart.length}</h4>
                    {!cart.length ? <h4>No product in cart.  <Link to="/shop">Contiue shoppong</Link></h4> : (
                        showCartItems()
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
                                <button disabled={!cart.length} onClick={saveOrderToDb} className="btn btn-sm btn-primary mt-2">Procced to checkout</button>
                            ) : (
                                <button className="btn btn-sm btn-primary mt-2">
                                    <Link className="text-white" to={{
                                        pathname: "/login",
                                        state: { from: "cart"}
                                    }}>Login to checkout</Link>
                                </button>
                            )
                        }
                </div>
            </div>
        </div>
    )
}

export default Cart
