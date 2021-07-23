import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { applyCoupon, createCashOrderForUser, emptyUserCart, getUserCart, saveUserAddress } from '../functions/user'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const Checkout = ({history}) => {
    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)

    const [coupon, setCoupon] = useState('')

    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [discountError, setDiscoutError] = useState('')

    const dispatch = useDispatch()
    const { user, cod } = useSelector(state => state)
    const couponTrueOrFalse = useSelector(state => state.coupon)

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
            setTotalAfterDiscount(0)
            setCoupon('')
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
        <input type="text" className="form-control" onChange={e => {
            setCoupon(e.target.value)
            setDiscoutError('')
            }}  value={coupon} />
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Apply</button>
        </>
    )

    const applyDiscountCoupon = () => {
        console.log(coupon)

        applyCoupon(user.token, coupon)
        .then( res => {
            if(res.data){
                setTotalAfterDiscount(res.data)
                //push the totalAfterDisocunt to redux true/false
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: true
                })
            }
            if(res.data.err){
                setDiscoutError(res.data.err)
                //udpate global redux state
            }
        })
    
    }

    const createCashOrder = () => {
        createCashOrderForUser(user.token, cod, couponTrueOrFalse).then(res => {
            console.log('User Cash order Created res', res)

            if(res.data.ok){
                
                if(typeof window !== undefined) localStorage.removeItem('cart')
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: []
                })

                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: false
                })

                dispatch({
                    type: 'COD',
                    payload: false
                })

                emptyUserCart(user.token)

                setTimeout(() => {
                    history.push('/user/history')
                }, 1000)
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
               <br /> 
               {discountError && <p className="text-danger">{discountError}</p>}
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                 <hr />
                <p>Products {products.length}</p>
                <hr />
                {showProductSummary()}
                <br />
               
               
                <p>Cart Total: {total}</p>
               
               {totalAfterDiscount > 0 && (
                   <p className="bg-success p-2">Discount applied - Total Payable: ${totalAfterDiscount}</p>
               )}

                <div className="row">
                    <div className="col-md-6">
                        {cod ? <button onClick={createCashOrder} disabled={!addressSaved} className="btn btn-info">Place Order</button> : 
                            <button onClick={() => history.push('/payment')} disabled={!addressSaved} className="btn btn-info">Place Order</button>
                        }
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
