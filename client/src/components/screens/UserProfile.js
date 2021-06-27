
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'
export const UserProfile = () => {

    const { userId } = useParams()
    const { state, dispatch } = useContext(UserContext)
    const [data, setData] = useState({})
    const [post, setPost] = useState([])
    const [showfollow, setshowfollow] = useState()


    useEffect(() => {
       setshowfollow(state? !state.following.includes(userId) : true)
    }, [showfollow])
     
   

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

    const followUser = () => {

        fetch("http://localhost:3001/follow", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                followId: userId
            })
        }).then(res => res.json())
            .then(result => {

                dispatch({
                    type: "UPDATE",
                    payload: {
                        following: result.following,
                        followers: result.followers
                    }
                })
                localStorage.setItem("user", JSON.stringify(result))
                console.log(result.followers);
                setData((prevState) => {
                    console.log(prevState.followers);
                    return {
                        ...prevState,
                       followers: [...prevState.followers, result.followers[0]],

                    }
                })
                setshowfollow(false)
            })
    }
    const unfollowUser = () => {
        fetch("http://localhost:3001/unfollow", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                followId: userId
            })
        }).then(res => res.json())
            .then(result => {
               
                dispatch({
                    type: "UPDATE",
                    payload: {
                        following: result.following,
                        followers: result.followers
                    }
                })
                localStorage.setItem("user", JSON.stringify(result))
                setData((prevState) => {
                    console.log(prevState);
                    const newfollower = prevState.followers.filter(item => item !== userId)
                   console.log(newfollower);
                    return {
                        ...prevState,
                        followers: newfollower
                    }
                })
                setshowfollow(true)
            })
    }

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

                                <h6>{post.length} posts </h6>
                                <h6>{data.followers.length} followers </h6>
                                <h6>{data.following.length} folllowing</h6>
                            </div>

                            {showfollow ?
                                <button
                                    onClick={() => followUser()}
                                    className="btn waves-effect waves-light#006064 cyan darken-2"
                                    type="submit"
                                    name="action"
                                    style={{ marginTop: "10px" }}
                                >Follow
                                </button>
                                :


                                <button
                                    onClick={() => unfollowUser()}
                                    className="btn waves-effect waves-light#006064 cyan darken-2"
                                    type="submit"
                                    name="action"
                                    style={{ marginTop: "10px" }}
                                >Unfollow
                                </button>
                            }

                            <br />
                            <br />
                        </div>

                    </div>

                    <div className="gallery">

                        {post.length > 0 ? post.map(item => {
                            return (
                                <img key={item._id} className="item" src={item.photo} alt='' />
                            )
                        }) : <h5>No posts</h5>}


                    </div>
                </>
                : ""}
        </div>
    )


}