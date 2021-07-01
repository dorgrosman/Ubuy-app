import React, { useState } from 'react'

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (event) => {
    event.preventDefault();

    props.history.push(`/search/name/${name}`)
  }


  return (
      <form className="search" onSubmit={submitHandler}>
      <div className="flex">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(event) => setName(event.target.value)}
          placeholder=" Search for items, brands and inspiration"
        />
        <button className="" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
    )
}


