import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import laptop from '../../images/product.png'
import { Drawer, Button } from 'antd'
import { Link } from 'react-router-dom' 

const SideDrawer = () => {

    const {cart, drawer} = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <Drawer title={`Cart / ${cart.length} Products`} visible={drawer} onClose={() => {
            dispatch({
                type: 'SET_VISIBLE', 
                payload: false
            })
        }}>
            {cart.map(p => (
                <div className="row" key={p._id}>
                    <div className="col">
                        {p.images[0] ? (
                            <>
                            <img src={p.images[0].url} style={{width: '100%'}} />
                            <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                            </>
                        ) :  <>
                        <img src={laptop} style={{width: '100%'}} />
                        <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                        </>}
                    </div>
                </div>
            ))}

            <Link to="/cart">
                <Button onClick={() => 
                    dispatch({
                        type: 'SET_VISIBLE', 
                        payload: false
                    })
                } className="text-center btn-block">
                    Add to cart
                </Button>
            </Link>
        </Drawer>
    )
}

export default SideDrawer
