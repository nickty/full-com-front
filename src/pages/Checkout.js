import React from 'react'

const Checkout = () => {
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
