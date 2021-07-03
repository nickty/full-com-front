import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'

const ForgotPassword = ({history}) => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail('')
            setLoading(false)
            toast.success('Check your email for password reset link')
        })
        .catch(err => {
            setLoading(false)
            toast.error(err.message)
        })

    }

    return (
    <div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h4>Forgot Password</h4>
                
                <form onSubmit={handleSubmit}>
                    <input placeholder="Enter your email" type="email" className="form-control" name="" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                    <button type="submit" className="btn btn-info mt-3 w-100" disabled={!email}>Submit</button>
                    
                </form>
            </div>
        </div>
     </div>
    )
}

export default ForgotPassword
