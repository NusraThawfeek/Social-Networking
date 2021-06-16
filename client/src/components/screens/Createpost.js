import { logDOM } from '@testing-library/react'
import React, { useState } from 'react'

export const Createpost = () => {
    const [Title, setTitle] = useState("")
    const [Body, setBody] = useState("")
    const [image, setimage] = useState([])
    const post = () => {
        fetch("http://localhost:3001/createpost",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:{
                title:Title,
                body:Body
            }
        }).then()

    }

    return (
        <div className="container" >
            <div className="card input-field" style={{ margin: "50px auto", maxWidth: "500px", textAlign: "center" }}>
                <div className="card-content">
                    <input
                        type="text"
                        placeholder="Title"
                        value={Title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Write a caption"
                        value={Body}
                        onChange={(e) => {
                            setBody(e.target.value)
                        }}
                    />

                    <div className="file-field input-field">
                        <div className="btn-floating btn-large waves-light#006064 cyan darken-4" style={{ paddingBottom: "55px" }}>
                            <i className="material-icons" style={{ fontSize: "30px" }}>add</i>

                            <input type="file" multiple 
                                onChange={(e)=>{
                                    console.log(e.target.files)
                                   // setimage(e.target.files[5])
                                }}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Add photo" />

                        </div>

                    </div>
                    <button className="btn waves-effect waves-light#006064 cyan darken-4" type="submit" name="action">Upload
                        <i className="material-icons right">send</i>
                    </button>
                </div>


            </div>
        </div>
    )
}
