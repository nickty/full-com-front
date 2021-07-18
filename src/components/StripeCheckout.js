import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { createPaymentIntent } from '../functions/stripe'
import { Link } from 'react-router-dom'

const StripeCheckout = ({history}) => {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state)

    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setShowProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')

    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        createPaymentIntent(user.token).then(res => {
            console.log("Create payment intent", res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
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
            <p className={succeeded ? 'result-message' : 'result-message hidden'}>Payment Successful <Link to="/user/history">see i in your history</Link></p>
            <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                <CardElement id="cart-element" options={cardStyle} onChange={handleChange} />
                <button type="submit" className="stripe-button" disabled={processing || disabled || succeeded}>
                    {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
                </button>
                {error && <div className="card-error">{error}</div>}
            </form>
           
        </div>
    )
}

export default StripeCheckout
