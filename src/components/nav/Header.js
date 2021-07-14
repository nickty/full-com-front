import React from 'react'
import { Menu } from 'antd'
import { UserAddOutlined, AppstoreOutlined, SettingFilled, LoginOutlined, UserOutlined, LogoutOutlined, ShopOutlined, ShoppingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux' 
import Search from '../forms/Search'

const { SubMenu, Item } = Menu

const Header = () => {

    const [current, setCurrent ] = useState('home')
    let dispatch = useDispatch();
   

    const {user} = useSelector(state => state)

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

            <Item key="shop" icon={<ShoppingOutlined /> }>
              <Link to="/shop">Shop</Link> 
            </Item>     

           

            {!user && (
                <Item key="register" icon={<UserAddOutlined /> } className="float-right">
                    <Link to="/register">Register</Link> 
                </Item>
            )}


            {!user && (
                <Item key="login" icon={<LoginOutlined /> } className="float-right">
                    <Link to="/login">Login</Link> 
                </Item>
            )}

            {user && (
                 <SubMenu icon={<SettingFilled />} title={user.email && user.email.split('@')[0] } className="float-right">

                  { user.role === 'subscriber' && <Item key="Setting:1"><Link to="/user/history">Dashboard</Link></Item>}              
                  { user.role === 'admin' && <Item key="Setting:2"><Link to="/admin/dashboard">Dashboard</Link></Item>}              
                 
    
                 <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
 
         </SubMenu>
            )}

            <span className="float-right p-1">
                <Search />
            </span>

           
        </Menu>
    )
}

export default Header
