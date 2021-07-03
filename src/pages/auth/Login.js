import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

       console.log(email)

    }
    const loginForm = () => (
    <form onSubmit={handleSubmit}>
        <input placeholder="Enter your email" type="email" className="form-control" name="" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
        <input placeholder="Enter your password" type="password" className="form-control mt-3" name="" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-info mt-3 w-100" disabled={ !email || password.length < 6 }>Login</button>
    </form>
    )
    return (
        <div className="container p-5">
           <div className="row">
               <div className="col-md-6 offset-md-3">
                   <h4>Login</h4>
                   
                   {loginForm()}
               </div>
           </div>
        </div>
    )
}

export default Login
