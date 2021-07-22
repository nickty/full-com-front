import React, { useEffect, useState } from 'react'
import AdminProductCard from '../../components/cards/AdminProductCard'
import AdminNav from '../../components/nav/AdminNav'
import { changeStatus, getOrders } from '../../functions/admin'
import { getProductsByCount } from '../../functions/product'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Orders from '../../components/order/Orders'


const AdminDashboard = () => {

    const [orders, setOrders] = useState([])
    const { user } = useSelector(state => state)

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = () => getOrders(user.token)
    .then(res => {
        setOrders(res.data)
    })

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token)
        .then(res => {
            toast.success("Status updated")
            loadOrders()
        })
    }
   
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                  <h4>Admin Dasboard</h4> 
                <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
