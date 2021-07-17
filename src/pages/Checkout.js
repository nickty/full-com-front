import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { applyCoupon, emptyUserCart, getUserCart, saveUserAddress } from '../functions/user'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const Checkout = () => {
    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)

    const [coupon, setCoupon] = useState('')

    const [totalAfterDiscount, setTotalAfterDiscount] = useState('')
    const [discountError, setDiscoutError] = useState('')

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

    const saveAddressToDb = () => {
        saveUserAddress(user.token, address)
        .then(res => {
            if(res.data.ok){
                setAddressSaved(true)
                toast.success("Address saved!")
            }
        })
    }

    const showAddress = () => (
        <>
        
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
                <hr />
                <button className="btn btn-info"  onClick={saveAddressToDb}>Save</button>
        </>
    )

    const showProductSummary = () => (
        products.map((p,i)=> (
            <div key={i}>
                <p>{p.product.title} ({p.color}) x ({p.count}) = {p.product.price * p.count}</p>
            </div>
        ))
    )

    const showApplyCoupon = () => (
        <>
        <input type="text" className="form-control" onChange={e => setCoupon(e.target.value)}  value={coupon} />
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Apply</button>
        </>
    )

    const applyDiscountCoupon = () => {
        console.log(coupon)

        applyCoupon(user.token, coupon)
        .then( res => {
            if(res.data){
                setTotalAfterDiscount(res.data)
                //push the totalAfterDisocunt to redux
            }
            if(res.data.err){
                setDiscoutError(res.data.err)
                //udpate global redux state
            }
        })
    
    }
 
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                {showAddress()}
                <h4>Got Coupon?</h4>
               {showApplyCoupon()}
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                 <hr />
                <p>Products {products.length}</p>
                <hr />
                {showProductSummary()}
                <hr />
                <p>Cart Total: {total}</p>
               

                <div className="row">
                    <div className="col-md-6">
                        <button disabled={!addressSaved} className="btn btn-info">Place Order</button>
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
