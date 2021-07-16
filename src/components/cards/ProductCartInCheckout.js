import React from 'react'

const ProductCartInCheckout = ({p}) => {
    return (
        <tbody>
            <tr>
                <td>image</td>
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
