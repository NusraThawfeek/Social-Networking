import React, { useContext, useEffect, useState } from 'react'
import {  useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import { HashLink as Link } from 'react-router-hash-link';

export const Profile = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory();

    useEffect(() => {
        fetch("http://localhost:3001/mypost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(result => {

                setData(result)

            })
    }, [])

  
    return (

        <div className="container" style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid gray"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src="https://www.pinkvilla.com/files/styles/contentpreview/public/DulquerSalmaan.jpg?itok=ajUxYXQd"
                    />
                </div>
                <div>
                    <h4>{state ? state.name : "loading..."}</h4>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "108%"
                    }}>{console.log(state)}
                        <h6>{data.length} posts</h6>
                        <h6>{state ? state.followers.length : "loading..."} followers</h6>
                        <h6>{state ? state.following.length : "loading..."} folllowing</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">

                {data.slice(0).reverse().map(item => {
                    return (
                      <Link to={"/mypost#qwe"+item._id}> 
                       <img 
                        key={item._id} 
                        className="item" src={item.photo} 
                         />
                        </Link>
                    )
                })}


            </div>
        </div>
    )
}
