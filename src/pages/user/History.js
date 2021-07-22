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

    const loadUserOrders = () => 
        getUserOrder(user.token)
        .then( res => {
            console.log(JSON.stringify(res.data))
            setOrders(res.data)
        })
    
    const showOrderInTable = order => (
        <p>paymntinfo roder</p>
    )

    const showEachOrders = () => orders.map((order, i) => (
        <div key={i} className="m-5 p-3 card">
            <p>show payment info</p>
            {showOrderInTable(order)}
            <div className="row">
                <div className="col">
                    <p>PDF Download</p>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center">
                    <h4>{orders.length > 0 ? "User purchased orders" : "No orders found"}</h4>
                    {showEachOrders()}
                </div>

                
            </div>
        </div>
    )
}

export default History
