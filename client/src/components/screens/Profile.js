import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'

export const Profile = () => {
const [data, setData] = useState([])
const {state,dispatch}=useContext(UserContext)

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
                    <h5>{state?state.name:"loading..."}</h5>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "108%"
                    }}>
                        <h6>50 posts</h6>
                        <h6>5 followers</h6>
                        <h6>10 folllowing</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">

            {data.map(item=>{
                return(
                    <img key={item._id} className="item" src={item.photo} />
                )
            })}
                
 
            </div>
        </div>
    )
}
