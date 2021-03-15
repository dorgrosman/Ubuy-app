import React, { useState } from 'react'

export default function SearchBox(props) {
    const [name, setName] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        props.history.push(`/search/name/${name}`)
    }


    return (
        <form className="search flex justify-center" onSubmit={submitHandler}>
            <div className="row " >
                <input
                    type="text"
                    name="q"
                    id="q"
                    onChange={(event) => setName(event.target.value)}
                />
                <button className="primary" type="submit" >
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </form>
    )
}


