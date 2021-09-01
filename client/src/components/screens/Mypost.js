import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'
import { Loader } from './Loader'


export const Mypost = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true)
        fetch("http://localhost:3001/mypost", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(result => {

                setData(result)
                setloading(false)
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
        setloading(true)
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
                setloading(false)
            })
    }



    return (
        <div className="container home">

            {data.slice(0).reverse().map(item => {
                return (
                    <div className="card home-card" key={item._id} id={"qwe" + item._id}>
                        <h5 style={{ padding: "5px 0px 0px 10px" }}><Link
                            to={"/profile/" + item.postedby._id}>{item.postedby.name}</Link></h5>
                        {state._id === item.postedby._id ? <i className="material-icons"
                            style={{ color: "black", marginTop: "-30px", marginLeft: "420px" }}
                            onClick={() => {
                                deletePost(item._id)
                            }}
                        >
                            delete
                        </i> : ""}
                        <div className="card-image" >
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
            {loading ? <Loader /> : null}

        </div>
    )
}
