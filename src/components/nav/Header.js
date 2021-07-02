import React from 'react'
import {Menu} from 'antd'
import { UserAddOutlined, AppstoreOutlined, SettingFilled, LoginOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { SubMenu, Item } = Menu

const Header = () => {

    const [current, setCurrent ] = useState('home')

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="d-block">
            <Item key="home" icon={<AppstoreOutlined /> }>
               Home
            </Item>

                     

            <SubMenu icon={<SettingFilled />} title="Username">
                
                    <Item key="Setting:1">Option 1</Item>
                    <Item key="Setting:2">Option 2</Item>
    
            </SubMenu>


            <Item key="register" icon={<UserAddOutlined /> } className="float-right">
               Register
            </Item>

            <Item key="login" icon={<LoginOutlined /> } className="float-right">
               Login
            </Item>

           
        </Menu>
    )
}

export default Header
