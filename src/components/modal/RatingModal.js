import React from 'react'
import { Modal, Button } from 'antd'
import { toast } from 'react-toastify'
import { StarOutlined } from '@ant-design/icons'
import {useSelector} from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'


const RatingModal = ({children}) => {

    const { user } = useSelector(state=>state)
    const [modalVisible, setModalVisible] = useState(false)

    let history = useHistory()

    const handleModal = () => {
        if(user && user.token){
            setModalVisible(true)
        } else {
            history.push("/login")
        }
    }

    return (
        <>
            <div onClick={handleModal}>
                <StarOutlined className="text-danger" /> <br /> 
                { user ? "Leave Rating" : "Login to leave rating"}
            </div>

            <Modal
                title="Leave Rating"
                centered
                visible={modalVisible}
                onOk={() => {setModalVisible(false)
                  toast.success('Thanks for your review. It will appear soon')  
                }}
                onCancel={() => setModalVisible(false)}
            >{children}</Modal>
        </>
    )
}

export default RatingModal
