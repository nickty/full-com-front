import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import laptop from '../../images/product.png'
import { Drawer, Button } from 'antd'

const SideDrawer = ({children}) => {

    const {cart, drawer} = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <Drawer visible={true}>
            {JSON.stringify(cart)}
        </Drawer>
    )
}

export default SideDrawer
