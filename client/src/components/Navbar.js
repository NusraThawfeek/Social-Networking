import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
      
            <nav>
                <div className="nav-wrapper #00838f cyan darken-3" style={{paddingLeft:"3%",paddingRight:"3%"}}>
                   <Link to="/" className="brand-logo" style={{}}>Social Network</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/signin">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/create">Create Post</Link></li>
                    </ul>
                </div>
            </nav>
    )
}

export default Navbar
