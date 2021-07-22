import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo'
import UserNav from '../../components/nav/UserNav'
import { getUserOrder } from '../../functions/user'
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const History = (order) => {

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
    
    const showOrderInTable = order => 
    <table className="table table-bordered">
        <thead className="thead-light">
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
           
        </tr>
        </thead>

        <tbody>
            {order.products.map((p, i)=>(
                <tr key={i}>
                    <td>
                        <b>
                            {p.product.title}
                        </b>
                    </td>
                    <td>
                           {p.product.price}

                    </td>
                    <td>
                           {p.product.brand}

                    </td>
                    <td>
                           {p.color}

                    </td>
                    <td>
                           {p.count}

                    </td>
                    <td>
                           {p.product.shipping === 'yes' ? <CheckCircleOutlined style={{color: 'green'}} /> : <CloseCircleOutlined style={{color: 'red'}} />}

                    </td>
                    
                </tr>
            ))}
        </tbody>
    </table>

    const showEachOrders = () => orders.map((order, i) => (
        <div key={i} className="m-5 p-3 card">
            <ShowPaymentInfo order={order} />
            {showOrderInTable(order)}
            <div className="row">
                <div className="col">
                    <div>{showDownlaodLink()}</div>
                </div>
            </div>
        </div>
    ));

    const showDownlaodLink = () => (
        <PDFDownloadLink document={
            <Document>
                <Page size="A4">
                    <View>
                        <Text>Section #1</Text>
                        <Text>Section #2</Text>
                    </View>
                </Page>
            </Document>
            
        }
        fileName='invoice.pdf'
        className="btn btn-sm btn-block">
           Download PDF
        </PDFDownloadLink>
    )

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
