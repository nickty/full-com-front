import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserNav from '../../components/nav/UserNav'
import { getUserOrder } from '../../functions/user'

const History = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state)


    const [orders, setOrders] = useState([])

    useEffect(() => {
        loadUserOrders()
    }, [])

    const loadUserOrders = () => {
        getUserOrder(user.token)
        .then( res => {
            console.log(JSON.stringify(res.data))
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">User page</div>
            </div>
        </div>
    )
}

export default History
