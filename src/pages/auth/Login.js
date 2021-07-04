import { LoadingOutlined, LoginOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../firebase';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { createOrUpdateUser } from '../../functions/auth';



const Login = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const { user } = useSelector(state => state)

    useEffect(()=>{
        if(user && user.token){
            history.push('/')
        }
    }, [user, history])


    const roleBasedRedirect = (res) => {
        if(res.data.role === 'admin'){
            history.push("/admin/dashboard")
        } else {
            history.push("/user/history")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)

       try {

        const result = await auth.signInWithEmailAndPassword(email, password)

       const { user } = result
       const idTokenResult = await user.getIdTokenResult();

       createOrUpdateUser(idTokenResult.token)
       .then(res => {
        dispatch({
            type:'LOGGED_IN_USER',
            payload: {
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            role: res.data.role,
            _id: res.data._id
            }
        })

        roleBasedRedirect(res)
       })
       .catch(err => console.log(err))
           
       } catch (error) {
           console.log(error)
           toast.error(error.message)
           setLoading(false)
       }

    }

    const googleLogin = async () => {
       await auth.signInWithPopup(googleAuthProvider)
       .then( result => {
           const { user } = result
           const idTokenResult = user.getIdTokenResult();

           createOrUpdateUser(idTokenResult.token)
           .then(res => {
            dispatch({
                type:'LOGGED_IN_USER',
                payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id
                }
            })
            roleBasedRedirect(res)
           })
           .catch(err => console.log(err))
                
       })
       .catch(err => {
        console.log(err)
        toast.error(err.message)
       })
    }
    const loginForm = () => (
    <form onSubmit={handleSubmit}>
        <input placeholder="Enter your email" type="email" className="form-control" name="" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
        <input placeholder="Enter your password" type="password" className="form-control mt-3" name="" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-info mt-3 w-100" disabled={ !email || password.length < 6 }>Login with Email and Password</button>
        
    </form>
    )
    return (
        <div className="container p-5">
           <div className="row">
               <div className="col-md-6 offset-md-3">
                   <h4>Login</h4>
                   {loading ? 'Loading..' : ''}
                   {loginForm()}
                   <button onClick={googleLogin} className="btn btn-primary mt-3 w-100">Login with Google</button>
                <Link to="/forgot/password" className="float-right text-danger mt-3">Forgot Password</Link>
               </div>
           </div>
        </div>
    )
}

export default Login
