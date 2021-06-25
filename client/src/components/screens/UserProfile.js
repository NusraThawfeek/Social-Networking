
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'
export const UserProfile = () => {
    {
        const [data, setData] = useState({})
        const [post, setPost] = useState([])

        const { userId } = useParams()

        useEffect(() => {
            fetch("http://localhost:3001/user/" + userId, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(res => res.json())
                .then(result => {
                    // console.log(result.user);
                    // console.log(result.posts)
                    setData(result.user)
                    setPost(result.posts)

                })
        }, [])
        return (
            <div className="container" style={{ maxWidth: "550px", margin: "0px auto" }}>
                {data.name ?
                    <>
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

                                <h4>{data.name ? data.name : "loading..."}</h4>
                                <h6>{data.email ? data.email : "loading..."}</h6>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    width: "108%"
                                }}>

                                    <h6>{post.length} posts</h6>
                                    <h6>5 followers</h6>
                                    <h6>10 folllowing</h6>
                                </div>
                            </div>
                        </div>

                        <div className="gallery">

                            {post.length > 0 ? post.map(item => {
                                return (
                                    <img key={item._id} className="item" src={item.photo} />
                                )
                            }) : <h5>No posts</h5>}


                        </div>
                    </>
                    : ""}
            </div>
        )
    }

}