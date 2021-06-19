import './App.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import Navbar from './components/Navbar';
import { Home } from './components/screens/Home';
import { Login } from './components/screens/Login';
import { Signup } from './components/screens/Signup';
import { Profile } from './components/screens/Profile';
import { Createpost } from './components/screens/Createpost';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducers/userReducer';

export const UserContext = createContext()

const Rounting = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
     // history.push("/")
    } 
    else {
      history.push("/signin")
    }
  }, [])
  return (

    <Switch>
      <Route exact path='/'><Home /></Route>
      <Route path='/signin'><Login /></Route>
      <Route path='/signup'><Signup /></Route>
      <Route path='/profile'><Profile /></Route>
      <Route path='/create'><Createpost /></Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (

    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Rounting />
      </Router>
    </UserContext.Provider>


  );
}

export default App;
