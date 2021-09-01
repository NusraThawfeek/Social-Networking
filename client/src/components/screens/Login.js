import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App';
import '../../App.css';
import image from '../../image.jpg'
import { Loader } from './Loader';


export const Login = () => {

    const {state,dispatch} = useContext(UserContext)
    const history = useHistory();

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [disable, setdisabled] = useState(false)
    const [invalidmsg, setinvalidmsg] = useState('')
    const [loading, setloading] = useState(false);

    const PostData = () => {
        setloading(true);
        fetch("http://localhost:3001/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                password: password,
                email: email
            })

        }).then(res => res.json()).then(data => {
            if (data.error) {
                console.log(data.error);
                setinvalidmsg(data.error)
                setloading(false)
            }
            else {
                
                localStorage.setItem("user",JSON.stringify(data.user))
                localStorage.setItem("token",data.token)
                dispatch({type:"USER",payload:data.user})
                history.push("/")
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const handleEmail = (e) => {
        setinvalidmsg('')
        setemail(e.target.value);
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)) {
            setdisabled(true);
        } else {
            setdisabled(false)
        }

    }

    return (//backgroundImage: `url(${image})`,
        <div className="background" style={{  minHeight: "94vh", marginTop: "-20px", padding: "70px" }}>
            <div className="card auth-card">
                <div className="card-content">
                    <h4>SIGN IN</h4>
                    <div style={{ color: "rgb(224, 51, 51)", fontFamily: "initial" }}>
                        {invalidmsg}
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmail}

                        />
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">lock</i>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setpassword(e.target.value)
                                setinvalidmsg('')

                            }}
                        />
                    </div>

                    <button className="btn waves-effect waves-light#006064 cyan darken-4"
                        type="submit"
                        name="action"
                        onClick={() => { PostData() }}
                        disabled={disable}
                    >Sign in
                        <i className="material-icons right">send</i>
                    </button>
                    <h6 style={{paddingTop:"5px"}}><Link to="/signup">Create account</Link></h6>
                </div>
            </div>
            {loading ? 
                <Loader/> 
                : null}
        </div>
    )
}
