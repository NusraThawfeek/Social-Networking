import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import { HashLink as Link } from 'react-router-hash-link';
import { Loader } from './Loader';

export const Profile = () => {
    const [data, setData] = useState([])
    const [image, setimage] = useState('')
    const [url, seturl] = useState("")
    const [view, setview] = useState(false)
    const [loading, setloading] = useState(false);

    const { state, dispatch } = useContext(UserContext)
    const history = useHistory();

    useEffect(() => {
        setloading(true)
        fetch("http://localhost:3001/mypost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(result => {
                setData(result)
                setloading(false)
            })
    }, [])


    useEffect(() => {
        setloading(true)
        if (image) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "social-network");
            formData.append("cloud_name", "nusracloud")

            fetch("https://api.cloudinary.com/v1_1/nusracloud/image/upload", {
                method: "POST",
                body: formData
            }).then(res => res.json()).then(data => {
                seturl(data.url)
                setview(true)
                setloading(false)
            }).catch(err => {
                console.log(err);
            })
        }
    }, [image])

    const saveImg = () => {
        if (url) {
            fetch("http://localhost:3001/edit", {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    profilePic: url
                })

            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.error);
                    }
                    else {
                        console.log(data);
                        dispatch({
                            type: "PROFILE",
                            payload: {
                                profilePic: url
                            }
                        })
                        localStorage.setItem("user", JSON.stringify(data))

                    }
                }).catch(err => {
                    console.log(err);
                })
        }
        setview(false)
    }

    return (
        <div className={view ? 'viewbg' : "container"} style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "2px solid gray"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px", marginBottom: "5px" }}
                        src={state ? state.profilePic : ''}
                    />
                </div>

                <div className="file-field input-field prfIcon">
                    <div className="btn-floating  waves-light#006064 cyan darken-1" >
                        <i className="material-icons" style={{ fontSize: "20px" }} >add</i>

                        <input type="file" multiple
                            onChange={(e) => {
                                console.log(e.target.files)
                                setimage(e.target.files[0])
                            }}
                            alt="edit"
                        />
                    </div>
                </div>
                <div>
                    <h4 style={{ marginTop: "20px" }}>{state ? state.name : "loading..."}</h4>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "108%",

                    }}>
                        <h6>{data.length} posts</h6>
                        <h6>{state ? state.followers.length : "loading..."} followers</h6>
                        <h6>{state ? state.following.length : "loading..."} folllowing</h6>
                    </div>
                </div>
            </div>
            {view ?
                <div className="card photo" >
                    <img
                        src={url ? url : ""}
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body photo2">
                        <a className="btn btn-primary" onClick={() => { saveImg() }}>save</a>
                    </div>
                </div>
                : ""}
            <div className="gallery">

                {data.length > 0 ? data.slice(0).reverse().map(item => {
                    return (
                        <Link to={"/mypost#qwe" + item._id} key={item._id}>
                            <img

                                className="item" src={item.photo}
                            />
                        </Link>
                    )
                }) : <h5>No posts</h5>}


            </div>
            {loading?<Loader/>:null}
        </div>
    )
}
