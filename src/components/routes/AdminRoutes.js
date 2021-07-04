import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { currentAdmin } from '../../functions/auth'
import LoadingToRedirect from './LoadingToRedirect'

const AdminRoute = ({children, ...rest}) => {

    const {user} = useSelector(state => state)

    const [ ok, setOk ] = useState(false)

    useEffect(() => {
        if(user && user.token){
            currentAdmin(user.token)
            .then(res => {
                setOk(true)
            })
            .catch(err => {
                console.log('Admin Route Error')
                setOk(false)
            })
        }
    }, [user])

    return ok ? <Route {...rest} /> : <LoadingToRedirect />
}

export default AdminRoute
