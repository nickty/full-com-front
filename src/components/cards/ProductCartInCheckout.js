import React from 'react'
import ModalImage from 'react-modal-image'
import { useDispatch } from 'react-redux'
import laptop from '../../images/product.png'
import { toast } from 'react-toastify'

const ProductCartInCheckout = ({p}) => {
    const dispatch = useDispatch()
    const colors = ["Black", "Brown", "Silver", "White", "Blue"]

    const handleColorChange = (e) => {
        console.log('color change', e.target.value)

        let cart = []
        if(typeof window !== undefined){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.map((product, i ) => {
                if(product._id === p._id){
                    cart[i].color = e.target.value
                }
            })

            // console.log('cart update')
            localStorage.setItem("cart", JSON.stringify(cart))

            dispatch({
                type: "ADD_TO_CART", 
                payload: cart
            })
        }
    }
    const handleQuantityChange = (e) => {
        
        let counting = e.target.value < 1 ? 1 : e.target.value

        if(counting > p.quantity){
            toast.error(`Max available quantity: ${p.quantity}`)
            return;
        }

        let cart = []

        if(typeof window !==undefined){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
        }

        cart.map((product, i ) => {
            if(product._id === p._id){
                cart[i].count = counting
            }
        })

        // console.log('cart update')
        localStorage.setItem("cart", JSON.stringify(cart))

        dispatch({
            type: "ADD_TO_CART", 
            payload: cart
        })
    }
    return (
        <tbody>
            <tr>
                <td><div style={{width: "200px", height: 'auto'}}>
                        {p.images.length ? (<ModalImage small={p.images[0].url} large={p.images[0].url} />) : (<ModalImage small={laptop} large={laptop}></ModalImage>) }
                    </div></td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select onChange={handleColorChange} name="color" className="form-control">
                        {p.color ? <option>{p.color}</option> : <option>select</option>}
                        {colors.filter(c => c !== p.color).map((c) => <option key={c} value={c}>
                            {c}
                        </option>)}
                    </select>
                </td>
                <td className="text-center">
                    <input onChange={handleQuantityChange} type="number" className="form-control" name="" value={p.count} />
                </td>
                <td>shipping</td>
                <td>Delete</td>
            </tr>
        </tbody>
    )
}

export default ProductCartInCheckout
