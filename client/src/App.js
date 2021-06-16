import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import { Home } from './components/screens/Home';
import { Login } from './components/screens/Login';
import { Signup } from './components/screens/Signup';
import { Profile } from './components/screens/Profile';
import { Createpost } from './components/screens/Createpost';


function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Route exact path='/'><Home/></Route>
        <Route path='/signin'><Login/></Route>
        <Route path='/signup'><Signup/></Route>
        <Route path='/profile'><Profile/></Route>
        <Route path='/create'><Createpost/></Route>
      </Router>

    </div>

  );
}

export default App;
