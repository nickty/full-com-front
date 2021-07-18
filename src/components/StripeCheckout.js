import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { createPaymentIntent } from '../functions/stripe'

const StripeCheckout = ({history}) => {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state)

    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')

    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        createPaymentIntent(user.token).then(res => {
            console.log("Create payment intent", res.data.clientSecret)
            setClientSecret(res.data)
        })
    }, [])

    const handleSubmit = (e) => {

    }

    const handleChange = (e) => {
        
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
            <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                <CardElement id="cart-element" options={cardStyle} onChange={handleChange} />
                <button type="submit" className="stripe-button" disabled={processing || disabled || succeeded}>
                    {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
                </button>
            </form>
        </div>
    )
}

export default StripeCheckout
