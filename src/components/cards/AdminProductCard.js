import React from 'react'

import { Card } from 'antd'

const { Meta } = Card

const AdminProductCard = ({product}) => {

    const { title, description, images } = product
    return (
        <div>
            <Card cover={
                <img src={images && images.length ? images[0].url : ""} style={{height: "150px", objectFit: "cover"}} />
            }>
                <Meta title={title} description={description} />
            </Card>
        </div>
    )
}

export default AdminProductCard
