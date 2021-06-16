import React from 'react'

export const Home = () => {
    return (
        <div className="container home">
            <div className="card home-card">
                <h5>DQ</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1621570168077-befe8b7eab56?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" alt=""/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{ color: "red" }}>favorite_border</i>
                    <h6>Title</h6>
                    <p>this is a card with image of DQ.</p>
                    <input type="text" placeholder="add comment" />

                </div>
            </div>

            <div className="card home-card">
                <h5>DQ</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1621570168077-befe8b7eab56?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" alt=""/>
                </div>
                <div className="card-content">
                    <i class="material-icons" style={{ color: "red" }}>favorite_border</i> 
                    <h6>Title</h6>
                    <p>this is a card with image of DQ.</p>
                    <input type="text" placeholder="add comment" />

                </div>
            </div>
        </div>
    )
}
