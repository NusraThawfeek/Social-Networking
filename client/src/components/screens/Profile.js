import React from 'react'

export const Profile = () => {
    return (
        <div className="container" style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom:"1px solid gray"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src="https://www.pinkvilla.com/files/styles/contentpreview/public/DulquerSalmaan.jpg?itok=ajUxYXQd"
                    />
                </div>
                <div>
                    <h5>Dulqar Salman</h5>
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
            <img className="item" src="https://filmfare.wwmindia.com/content/2016/Jul/14_1469712507.jpg" />
            <img className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7cXxvGCOUnhEnbjVqS6WqYmVVHeTJAl_Ew&usqp=CAU" />
            <img className="item" src="https://filmfare.wwmindia.com/content/2016/Jul/14_1469712507.jpg" />
            <img className="item" src="https://filmfare.wwmindia.com/content/2016/Jul/14_1469712507.jpg" />
            <img className="item" src="https://filmfare.wwmindia.com/content/2016/Jul/14_1469712507.jpg" />
            <img className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7cXxvGCOUnhEnbjVqS6WqYmVVHeTJAl_Ew&usqp=CAU" />
            <img className="item" src="https://images.unsplash.com/photo-1621705471214-b1e0a2b42bcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"/>
            </div>
        </div>
    )
}
