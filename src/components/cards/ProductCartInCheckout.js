import React from 'react'
import ModalImage from 'react-modal-image'
import laptop from '../../images/product.png'

const ProductCartInCheckout = ({p}) => {
    return (
        <tbody>
            <tr>
                <td><div style={{width: "200px", height: 'auto'}}>
                        {p.images.length ? (<ModalImage small={p.images[0].url} large={p.images[0].url} />) : (<ModalImage small={laptop} large={laptop}></ModalImage>) }
                    </div></td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.brand}</td>
                <td>{p.color}</td>
                <td>{p.count}</td>
                <td>shipping</td>
                <td>Delete</td>
            </tr>
        </tbody>
    )
}

export default ProductCartInCheckout
