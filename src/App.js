import { Switch, Route} from 'react-router-dom'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home'
import Header from './components/nav/Header';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (

  <>
        <Header />
        <ToastContainer />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
  </>    
    
  );
}

export default App;