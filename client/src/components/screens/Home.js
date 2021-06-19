import React, { useEffect, useState } from 'react'

export const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {

        fetch("http://localhost:3001/allpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(result => {

                setData(result)
                console.log(result);
            })
    }, [])

    return (
        <div className="container home">
            {data.map(item => {
                return (
                    <div className="card home-card" key={item._id}>
                        <h5>{item.postedby.name}</h5>
                        <div className="card-image">
                            <img src={item.photo} alt="" />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{ color: "red" }}>favorite_border</i>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input type="text" placeholder="add comment" />

                        </div>
                    </div>
                )
            })}


        </div>
    )
}
