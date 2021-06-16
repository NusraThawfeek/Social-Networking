import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import image from '../../image.jpg'


export const Signup = () => {
    const history = useHistory();
    const [name, setname] = useState("");
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [disable, setdisabled] = useState(false)
    const [invalidmsg, setinvalidmsg] = useState('')

    const PostData = () => {

        fetch("http://localhost:3001/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                password: password,
                email: email
            })

        }).then(res => res.json()).then(data => {
            if (data.error) {
                console.log(data.error);
                setinvalidmsg(data.error)
            }
            else {
                console.log(data.message);
                history.push("/signin")
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

    return (
        <div style={{ backgroundImage: `url(${image})`, minHeight: "94vh", marginTop: "-20px", marginBottom: "0px", padding: "70px" }}>

            <div className="card auth-card">
                <div className="card-content">
                    <h4>SIGN UP</h4>
                    <div style={{ color: "rgb(224, 51, 51)", fontFamily: "initial" }}>
                        {invalidmsg}
                    </div>

                    <div className="input-field">
                    <i class="material-icons prefix">account_circle</i>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => {
                                setname(e.target.value)
                                setinvalidmsg('')
                            }}
                        />
                        </div>
                         <div className="input-field">
                         <i class="material-icons prefix">email</i>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmail}

                        />
                        </div>
                         <div className="input-field">
                         <i class="material-icons prefix">lock</i>
                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setpassword(e.target.value)
                                setinvalidmsg('')
                                
                            }}
                        />
                    </div>
                    <button
                        className="btn waves-effect waves-light#006064 cyan darken-4"
                        type="submit"
                        name="action"
                        onClick={() => { PostData() }}
                        disabled={disable}
                    >Sign up
                        <i className="material-icons right">send</i>
                    </button>
                    <h6><Link to="/signin">Already have an account?</Link></h6>
                </div>
            </div>
        </div>
    )
}
