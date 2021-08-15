import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import './screens/SideBar.css'

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click)



    const renderList = () => {
        if (state) {
            return (
                <>
                    <li className="tab"><Link to="/">Home</Link></li>
                    <li className="tab"><Link to="/create">Create Post</Link></li>
                    <li className="tab"><Link to="/profile">Profile</Link></li>


                    <li className="tab"> <button className="btn waves-effect waves-light#006064 cyan darken-3"
                        type="submit"
                        name="action"
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: "CLEAR" })
                            history.push("/signin")
                        }}
                    >Sign out

                    </button></li>
                </>
            )
        } else
            return (<>
                <li><Link to="/signin">Signin</Link></li>
                <li><Link to="/signup">Signup</Link></li>
            </>)


    }

    return (
        <div>
            <nav className="nav-extended">
                <div className="nav-wrapper #00838f cyan darken-3" style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                    <Link to={state ? "/" : "/signin"} className="brand-logo">Social Network</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {renderList()}
                    </ul>
                </div>
                <div className=" menu nav-content #00838f cyan darken-3">
                    <ul className="tabs tabs-transparent">
                        {renderList()}
                    </ul>
                </div>
            </nav>



        </div>
    )
}

export default Navbar
