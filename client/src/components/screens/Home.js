import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'

export const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {

        fetch("http://localhost:3001/allpost", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(result => {

                setData(result)
                // console.log(result);
            })
    }, [])

    const likePost = (id) => {
        fetch("http://localhost:3001/like", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                postId: id
            })
        })
            .then(res => res.json()).then(result => {

                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err);
            })
    }

    const unlikePost = (id) => {
        fetch("http://localhost:3001/unlike", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json()).then(result => {
            const newData = data.map(item => {
                if (item._id === result._id) {
                    return result;
                } else {
                    return item
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err);
        })
    }

    const makeComment = (text, postId) => {
        fetch("http://localhost:3001/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item
                    }
                })
                setData(newData)

            }).catch(err => {
                console.log(err);
            })
    }

    const deletePost = (id) => {
        fetch("http://localhost:3001/deletepost/" + id, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(result => {
               // console.log(result);
                const newData = data.filter(item => {
                    return item._id !== result._id

                })
                setData(newData)
            })
    }
    return (
        <div className="container home">
            {data.map(item => {
                return (
                    <div className="card home-card" key={item._id}>
                        <h5>{item.postedby.name}</h5>
                        <i className="material-icons"
                                    style={{ color: "black" ,float:"right",marginTop:"-30px"}}     
                               onClick={()=>{
                                   deletePost(item._id)
                               }}
                                >
                                  delete
                                </i>
                        <div className="card-image">
                            <img src={item.photo} alt="" />
                        </div>
                        <div className="card-content">
                            {item.likes.includes(state._id) ?
                                <i className="material-icons"
                                    style={{ color: "red" }}
                                    onClick={() => {
                                        unlikePost(item._id)
                                    }}
                                >favorite</i> :
                                <i className="material-icons"
                                    style={{ color: "black" }}
                                    onClick={() => {
                                        likePost(item._id)
                                    }}
                                >
                                    favorite_border
                                </i>
                            }

                            <h6>{item.likes.length} likes</h6>
                            <p>{item.body}</p>
                            {
                                item.comments.map(com => {
                                    return (
                                        <h6 key={com._id}><span style={{ fontWeight: "600" }}>{com.postedby.name}</span> {com.Text}</h6>
                                    )
                                })
                            }
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                makeComment(e.target[0].value, item._id)
                            }
                            }>
                                <input type="text" placeholder="add comment" />
                            </form>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}
