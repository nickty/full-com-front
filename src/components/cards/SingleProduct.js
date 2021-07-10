import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons' 

const {Meta} = Card

const SingleProduct = ({product}) => {

    const { title, description, images, slug } = product

    return (
        <>
            <div className="col-md-7">
                image
            </div>
            <div className="col-md-5">
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success" /> <br /> Add to cart
                        </>, 
                        <Link to={`/`}><HeartOutlined className="text-info" /> <br /> Add to wishlish</Link>,
                    ]}
                >
                    <Meta title={title} description={description} />
                </Card>
            </div>
        </>
    )
}

export default SingleProduct
