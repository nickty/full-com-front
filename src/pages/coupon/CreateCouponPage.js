import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../components/nav/AdminNav'
import { createCoupon } from '../../functions/coupon'

const CreateCouponPage = () => {
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [discount, setDiscount] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        
       
    }, [])

    const handleSubmit = (e) => {
      e.preventDefault()
      setLoading(true)
      createCoupon({name, expiry, discount}, user.token)
      .then(res => {
          setLoading(false)
          setName('')
          setDiscount('')
          setExpiry('')
          toast.success(`"${res.data.name}" is is created`)
      })
      .catch(err => {
          console.log(err)
          setLoading(false)
      })

    }

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
                <h4>Coupon</h4>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="" className="text-muted">Name</label>
                        <input type="text" className="form-control" autoFocus required value={name} onChange={e=>setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label for="" className="text-muted">Discount</label>
                        <input type="text" className="form-control" required value={discount} onChange={e=>setDiscount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label for="" className="text-muted">Expiry</label><br />
                        <DatePicker onChange={date => setExpiry(date)} className="form-control" selected={new Date()} value={expiry} required />
                    </div>

                    <button type="submit" className="btn btn-info">Create</button>
                </form>

            </div>
        </div>
    </div>
    )
}

export default CreateCouponPage
