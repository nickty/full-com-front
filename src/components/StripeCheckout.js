import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { createPaymentIntent } from '../functions/stripe'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { DollarOutlined, CheckOutlined } from '@ant-design/icons'
import laptop from '../images/mern.jpg'
import { createOrder, emptyUserCart } from '../functions/user'

const StripeCheckout = ({history}) => {

    const dispatch = useDispatch()
    const {user, coupon} = useSelector(state => state)

    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setShowProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')

    const [cartTotal, setCartTotal] = useState(0)
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [payable, setPayable] = useState(0)

    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        createPaymentIntent(user.token, coupon).then(res => {
            console.log("Create payment intent", res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
            //additional response received on successful payment
            setCartTotal(res.data.cartTotal)
            setTotalAfterDiscount(res.data.totalAfterDiscount)
            setPayable(res.data.payable)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement), 
                billing_details: {
                    name: e.target.name.value
                }
            }
        })

        if(payload.error){
            setError(`Payment failed ${payload.error.message}`)
            setShowProcessing(false)
        } else {

            createOrder(user.token, payload)
            .then(res => {
                if(res.data.ok){
                    //emptry cart from local storage
                    if(typeof window !== undefined) localStorage.removeItem("cart")
                    // emtpry for form redux
                    dispatch({
                        type: "ADD_TO_CART",
                        payload: []
                    })
                    dispatch({
                        type: "COUPON_APPLIED",
                        payload: []
                    })
                    emptyUserCart(user.token)
                    
                }
            })

            console.log(JSON.stringify(payload, null, 4))
            setError(null)
            setShowProcessing(false)
            setSucceeded(true)
        }
    }

    const handleChange = (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")
    }

    const cardStyle = {
        style: {
            base: {
                color: "#32325d", 
                fontFamily: "Arial, sans-serif", 
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder" : {
                    color: "#32325d"
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    }

    return (
        <div>
           {
               !succeeded && <div>
                   {coupon && totalAfterDiscount !== undefined ? (
                       <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
                   ) : (<p className="alert alert-danger">No Coupon applied</p>)}
               </div>
           }
            <div className="text-center pb-5">
                <Card cover={<img src={laptop} style={{height: '200px', objectFit: 'cover', marginBottom: "-50px"}} /> }
                actions={[
                    <>
                        <DollarOutlined className="text-info" /> <br />
                        Total: ${cartTotal}
                    </>,
                     <>
                     <CheckOutlined className="text-info" /> <br />
                     Total Payable: ${(payable / 100).toFixed(2)}
                 </>,
                ]}
                />
            </div>
            <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                <CardElement id="cart-element" options={cardStyle} onChange={handleChange} />
                <button type="submit" className="stripe-button" disabled={processing || disabled || succeeded}>
                    {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
                </button>
                {error && <div className="card-error">{error}</div>}
                <br />
                <p className={succeeded ? 'result-message' : 'result-message hidden'}>Payment Successful <Link to="/user/history">see i in your history</Link></p>
            </form>
           
        </div>
    )
}

export default StripeCheckout
