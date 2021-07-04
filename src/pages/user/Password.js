import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'

const Password = () => {

    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setLoading(true)
        await auth.currentUser.updatePassword(password)
        .then(() => {

            setLoading(false)
            setPassword('')
            toast.success('Password updated')

        })
        .catch(err => {
            setLoading(false)
            toast.error(err.message)
        })
    }

    const passwordUpdateForm = () => <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label for="password">Your Password</label>
            <input type="password" className="form-control" disabled={loading} onChange={ e => setPassword(e.target.value)} name="" value={password} placeholder="Enter your password" />
            <button type="submit" disabled={!password || loading || password.length < 6 } className="btn btn-primary mt-3">Submit</button>
        </div>
    </form>
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <h4>Password Update Form</h4>
                    {loading ? <LoadingOutlined /> : passwordUpdateForm() }
                </div>
            </div>
        </div>
    )
}

export default Password
