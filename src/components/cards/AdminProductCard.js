import React from 'react'
import product from '../../images/product.png'
import { Card } from 'antd'
import { EditOutlined, DeleteOutlined} from '@ant-design/icons'

const { Meta } = Card

const AdminProductCard = ({product}) => {

    const { title, description, images } = product
    return (
        <div>
            <Card cover={
                <img src={images && images.length ? images[0].url : product } style={{height: "150px", objectFit: "cover"}} />
            }
            actions={[
                <EditOutlined className="text-info" />, <DeleteOutlined className="text-warning"/>
            ]}
            >
                <Meta title={title} description={`${description && description.substring(0, 40)}...`} />
            </Card>
        </div>
    )
}

export default AdminProductCard
