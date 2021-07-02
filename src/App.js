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


function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()

        dispatch({
          type:'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
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
        </Switch>
  </>    
    
  );
}

export default App;