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
import { UserProfile } from './components/screens/UserProfile';
import { SubscribedUser } from './components/screens/SubscribedUser';
import { Mypost } from './components/screens/Mypost';

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
      <Route exact path='/home'><Home /></Route>
      <Route path='/signin'><Login /></Route>
      <Route path='/signup'><Signup /></Route>
      <Route exact  path='/profile'><Profile /></Route>
      <Route path='/create'><Createpost /></Route>
      <Route path='/profile/:userId'><UserProfile /></Route>
      <Route exact path='/'><SubscribedUser/></Route>
      <Route path='/mypost'><Mypost /></Route>
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
