import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App'

export default function Search() {

    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [data, setData] = useState([])
    const [suggestions, setsuggestions] = useState([])
    const [names, setnames] = useState('')
    const [error, seterror] = useState(true)
    const myId = (state ? state._id : "")

    const redirect = (id) => {
        if (id === myId) {
            history.push("/profile")
        } else {
            history.push("/profile/" + id)
        }
    }

    const setName = (event) => {
        const value = event.target.value;

        let suggestions = [];
        if (value.length > 0) {

            const regex = new RegExp(`${value}`, `i`);

            suggestions = data.sort((a, b) => a.name.localeCompare(b.name)).filter(v => regex.test(v.name));

        }
        setsuggestions(suggestions)
        setnames(value)
        seterror(true)


    }
    const rendersuggestions = () => {

        if (names.length > 0) {

            if (suggestions.length === 0 && error === true) {

                return <tr
                    className="text-danger" >
                    <td colSpan='3'>
                        Invalid username</td>

                </tr>

            }
            else
                return (

                    suggestions.map(
                        sdata => (
                            <tr key={sdata._id}
                            style={{cursor:"pointer"}}
                                onClick={() => redirect(sdata._id)}
                            >
                                <td>{sdata.name}</td>

                            </tr>

                        ))


                )
        }
    
    }


    useEffect(() => {
        fetch("http://localhost:3001/all", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result);
                setData(result)

            })
    }, [])





    return (
        <div>
            <div className="container home-card">
                <input className="form-control  searchbar" type="text" value={names} placeholder="search"
                    onChange={setName}></input>
                <button type="submit" className='search-btn'><i className="fa fa-search"></i></button>



                <table className="table table-borderless" >

                    <tbody>
                        {rendersuggestions()}

                    </tbody>
                </table>

                <br />
            </div>
        </div>
    )
}
