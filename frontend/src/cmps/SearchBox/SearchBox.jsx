import React, { useState } from 'react'

export default function SearchBox(props) {
    const [name, setName] = useState('');
    console.log('name:', name)

    const submitHandler = (event) => {
        event.preventDefault();
        
        props.history.push(`/search/name/${name}`)
    }


    return (
        <form className="search" onSubmit={submitHandler}>
        <div className="row">
          <input
            type="text"
            name="q"
            id="q"
            // onChange={(event) => {console.log('event:', event.target.value)}}
            
            onChange={(event) => setName(event.target.value)}
          ></input>
          <button className="primary" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    )
}


