import React from 'react'
import {Menu} from 'antd'
import { MailOutlined, AppstoreOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { SubMenu } = Menu

const Header = () => {

    const [current, setCurrent ] = useState('')

    const handleClick = () => {

    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="main">
               Home
            </Menu.Item>

            <SubMenu icon={<SearchOutlined />} title="Register">
                
                    <Menu.Item key="Setting:1">Option 1</Menu.Item>
                    <Menu.Item key="Setting:2">Option 2</Menu.Item>
    
            </SubMenu>
        </Menu>
    )
}

export default Header
