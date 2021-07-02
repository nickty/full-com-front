import React from 'react'
import { Menu } from 'antd'
import { UserAddOutlined, AppstoreOutlined, SettingFilled, LoginOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import { useDispatch } from 'react-redux' 

const { SubMenu, Item } = Menu

const Header = () => {

    const [current, setCurrent ] = useState('home')
    let dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const logout = () => {
        firebase.auth().signOut();

        

        dispatch({
            type: "LOGOUT", 
            payload: null
        })

        history.push('/login')
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="d-block">
            <Item key="home" icon={<AppstoreOutlined /> }>
              <Link to="">Home</Link> 
            </Item>

                     

            <SubMenu icon={<SettingFilled />} title="Username">
                
                    <Item key="Setting:1">Option 1</Item>
                    <Item key="Setting:2">Option 2</Item>
                    <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
    
            </SubMenu>


            <Item key="register" icon={<UserAddOutlined /> } className="float-right">
                <Link to="/register">Register</Link> 
            </Item>

            <Item key="login" icon={<LoginOutlined /> } className="float-right">
                <Link to="/login">Login</Link> 
            </Item>

           
        </Menu>
    )
}

export default Header
