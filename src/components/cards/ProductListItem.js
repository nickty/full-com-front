import React from 'react'
import { Link } from 'react-router-dom'

const ProductListItem = ({product}) => {

    const { price, shipping, color, brand, quantity, sold, category, subs } = product;
   
    return (
        <ul className="list-group">
            <li className="list-group-item">
                Price <span className="float-right">${price}</span>
            </li>
            {/* {JSON.stringify(subs)}
            {JSON.stringify(category)} */}
            {category && (<li className="list-group-item">
                Category <Link to={`/category/${category.slug}`} className="float-right">{category.name}</Link>
            </li>)}
           
           {subs && (
               <li className="list-group-item">
                   Sub Categories
                   {subs.map(s => (
                       <Link to={`/sub/${s.slug}`} className="float-right pl-3">
                           {s.name}
                       </Link>
                   ))}
               </li>
           )}

           
            <li className="list-group-item">
                Shipping <span className="float-right">{shipping}</span>
            </li>
            <li className="list-group-item">
                Color <span className="float-right">{color}</span>
            </li>
            <li className="list-group-item">
                Brand <span className="float-right">{brand}</span>
            </li>
            <li className="list-group-item">
                Available <span className="float-right">{quantity - sold}</span>
            </li>
           
            <li className="list-group-item">
                Sold <span className="float-right">{sold}</span>
            </li>
        </ul>
    )
}

export default ProductListItem
