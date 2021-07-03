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
  }, [])


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
        </Switch>
  </>    
    
  );
}

export default App;