import { lazy, Suspense } from 'react'
import { Switch, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { currentUser } from './functions/auth';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { auth } from './firebase';
import { LoadingOutlined } from '@ant-design/icons';

// import RegisterComplete from './pages/auth/RegisterComplete';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import History from './pages/user/History';
// import UserRoute from './components/routes/UserRoute';
// import Password from './pages/user/Password';
// import Wishlist from './pages/user/Wishlist';
// import AdminRoute from './components/routes/AdminRoutes';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import CategoryCreate from './pages/admin/category/CategoryCreate';
// import CategoryUpdate from './pages/admin/category/CategoryUpdate';
// import SubCreate from './pages/admin/sub/SubCreate';
// import SubUpdate from './pages/admin/sub/SubUpdate';
// import ProductCreate from './pages/admin/product/ProductCreate';
// import AllProducts from './pages/admin/product/AllProducts';
// import ProductUpdate from './pages/admin/product/ProductUpdate';
// import Product from './pages/Product';
// import CategoryHome from './pages/category/CategoryHome';
// import SubHome from './pages/sub/SubHome';
// import Shop from './pages/Shop';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import CreateCouponPage from './pages/coupon/CreateCouponPage';
// import Paymnet from './pages/Paymnet';

// using lazy
const Login = lazy(() => import('./pages/auth/Login'))
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'))
const Register = lazy(() => import('./pages/auth/Register'))
const Home = lazy(() => import('./pages/Home'))
const Header = lazy(() => import('./components/nav/Header'))
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const History = lazy(() => import('./pages/user/History'))
const UserRoute = lazy(() => import('./components/routes/UserRoute'))
const Password = lazy(() => import('./pages/user/Password'))
const Wishlist = lazy(() => import('./pages/user/Wishlist'))
const AdminRoute = lazy(() => import('./components/routes/AdminRoutes'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'))
const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'))
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'))
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'))
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'))
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'))
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'))
const Product = lazy(() => import('./pages/Product'))
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'))
const SubHome = lazy(() => import('./pages/sub/SubHome'))
const Shop = lazy(() => import('./pages/Shop'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const CreateCouponPage = lazy(() => import('./pages/coupon/CreateCouponPage'))
const Paymnet = lazy(() => import('./pages/Paymnet'))


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
    
  <Suspense fallback={
    <div className="col text-center h2 p-5 pt-10">
      <LoadingOutlined />
    </div>
  }>
        <Header />
        <SideDrawer />
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
          
          <UserRoute path="/checkout" exact component={Checkout} />
          <UserRoute path="/payment" exact component={Paymnet} />

          <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
          <AdminRoute path="/admin/category" exact component={CategoryCreate} />
          <AdminRoute path="/admin/category/:slug" exact component={CategoryUpdate} />

          <AdminRoute path="/admin/sub" exact component={SubCreate} />
          <AdminRoute path="/admin/sub/:slug" exact component={SubUpdate} />

          <AdminRoute path="/admin/product" exact component={ProductCreate} />
          <AdminRoute path="/admin/products" exact component={AllProducts} />
          <AdminRoute path="/admin/product/:slug" exact component={ProductUpdate} />

          <AdminRoute path="/admin/coupon" exact component={CreateCouponPage} />

          <Route path="/product/:slug" exact component={Product} />

          <Route path="/category/:slug" exact component={CategoryHome} />
          <Route path="/sub/:slug" exact component={SubHome} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/cart" exact component={Cart} />
        </Switch>
  </Suspense>    
    
  );
}

export default App;