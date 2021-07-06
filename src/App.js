import { Switch, Route} from 'react-router-dom'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home'
import Header from './components/nav/Header';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import RegisterComplete from './pages/auth/RegisterComplete';

import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { auth } from './firebase';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './functions/auth';
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoute';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminRoute from './components/routes/AdminRoutes';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import AllProducts from './pages/admin/product/AllProducts';


function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()

        currentUser(idTokenResult.token)
           .then(res => {
            dispatch({
                type:'LOGGED_IN_USER',
                payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id
                }
            })
           })
           .catch(err => console.log(err))
      }
    }) 

    return () => unsubscribe(); 
  }, [dispatch])


  return (

  <>
        <Header />
        <ToastContainer />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/register/complete" exact component={RegisterComplete} />
          <Route path="/forgot/password" exact component={ForgotPassword} />

          <UserRoute path="/user/history" exact component={History} />
          <UserRoute path="/user/password" exact component={Password} />
          <UserRoute path="/user/wishlist" exact component={Wishlist} />

          <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
          <AdminRoute path="/admin/category" exact component={CategoryCreate} />
          <AdminRoute path="/admin/category/:slug" exact component={CategoryUpdate} />

          <AdminRoute path="/admin/sub" exact component={SubCreate} />
          <AdminRoute path="/admin/sub/:slug" exact component={SubUpdate} />

          <AdminRoute path="/admin/product" exact component={ProductCreate} />
          <AdminRoute path="/admin/products" exact component={AllProducts} />
        </Switch>
  </>    
    
  );
}

export default App;