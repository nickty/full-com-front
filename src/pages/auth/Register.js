import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const Register = ({history}) => {

    const [email, setEmail] = useState('')

    const { user } = useSelector(state => state)

    useEffect(()=>{
        if(user && user.token){
            history.push('/')
        }
    }, [user, history])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config)

        toast.success(`Email is sent to ${email}. Click the link to complete your registration`)

        //save email into localstorage
        window.localStorage.setItem('emailForRegistration', email)

        //clear state

        setEmail('')

    }
    const registerForm = () => (
    <form onSubmit={handleSubmit}>
        <input placeholder="Enter your email" type="email" className="form-control" name="" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
        <button type="submit" className="btn btn-info mt-3">Register</button>
    </form>
    )
    return (
        <div className="container p-5">
           <div className="row">
               <div className="col-md-6 offset-md-3">
                   <h4>Register</h4>
                   
                   {registerForm()}
               </div>
           </div>
        </div>
    )
}

export default Register
