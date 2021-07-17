import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import AdminNav from '../../components/nav/AdminNav'

const CreateCouponPage = () => {

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
                <h4>Coupon</h4>
                

            </div>
        </div>
    </div>
    )
}

export default CreateCouponPage
