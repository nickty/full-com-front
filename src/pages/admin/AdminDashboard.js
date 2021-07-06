import React, { useEffect, useState } from 'react'
import AdminProductCard from '../../components/cards/AdminProductCard'
import AdminNav from '../../components/nav/AdminNav'
import { getProductsByCount } from '../../functions/product'

const AdminDashboard = () => {

   
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                  admin dasboard
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
