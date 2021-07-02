import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const RegisterComplete = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email || !password){
            toast.error("Email and password is required")
            return;
        }
        if(password.length < 6){
            toast.error("Password must be at least 6 characters long")
            return;
        }

        try {

            const result = await auth.signInWithEmailLink(email, window.location.href)

            if(result.user.emailVerified){
                //remove user email from localstorage
                window.localStorage.removeItem('emailForRegistration')
                // get token for current user
                let user = auth.currentUser
                await user.updatePassword(password)

                const idTokenResult = await user.getIdTokenResult()

                history.push('/')
            }
            
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

      
    }
    const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" name="" value={email} disabled />
        <input type="password" className="form-control mt-3" name="" value={password} onChange={e=>setPassword(e.target.value)} autoFocus placeholder="Enter password" />
        <button type="submit" className="btn btn-info mt-3">Register</button>
    </form>
    )
    return (
        <div className="container p-5">
           <div className="row">
               <div className="col-md-6 offset-md-3">
                   <h4>Compete your registration</h4>
                   
                   {completeRegistrationForm()}
               </div>
           </div>
        </div>
    )
}

export default RegisterComplete
