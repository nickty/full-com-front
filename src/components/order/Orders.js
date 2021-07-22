import React from 'react'
import ShowPaymentInfo from '../cards/ShowPaymentInfo'

const Orders = ({orders, handleStatusChange}) => {
    return (
        <div>
            {orders.map(order => (
                <div key={order._id} className="row pb-5">
                    <div className="btn btn-block bg-light">
                    <ShowPaymentInfo order={order} showStatus={false} />

                        <div className="row">
                            <div className="col-md-4">
                                Delivery Status
                            </div>
                            <div className="col-md-8">
                                <select defaultValue={order.orderStatus} onChange={ e => handleStatusChange(order._id, e.target.value)} className="form-control">
                                    <option value="Not Processed">Not Processed</option>
                                    <option value="Processign">Processign</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                    
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Orders
