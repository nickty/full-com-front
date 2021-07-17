import { DeleteOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../components/nav/AdminNav'
import { createCoupon, getCoupons, removeCoupon } from '../../functions/coupon'

const CreateCouponPage = () => {
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [discount, setDiscount] = useState('')
    const [loading, setLoading] = useState(false)

    const [coupon, setCoupon] = useState([])

    const { user } = useSelector(state => state)

    useEffect(() => {
        
        getCoupons().then(res => setCoupon(res.data))
       
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
          getCoupons().then(res => setCoupon(res.data))
      })
      .catch(err => {
          console.log(err)
          setLoading(false)
      })

    }

    const handleRemove = (couponId) => {
        if(window.confirm('Delete?')){
            removeCoupon(couponId, user.token).then(res => {
                getCoupons().then(res => setCoupon(res.data))
                toast.error(`Coupon ${res.data.name} is deleted`)
            })
        }
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

                <br />

                <h4>{coupon.length} Coupons</h4>
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Expiry</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {coupon.map(c => <tr key={c._id}>
                            <td className="text-center">{c.name}</td>
                            <td className="text-center">{ new Date(c.expiry).toLocaleDateString()}</td>
                            <td className="text-center">{c.discount}%</td>
                            <td className="text-center">
                                <DeleteOutlined onClick={() => handleRemove(c._id)} className="text-danger pointer" />
                            </td>
                        </tr>)}
                    </tbody>
                </table>

            </div>
        </div>
    </div>
    )
}

export default CreateCouponPage
