import React, { useState } from 'react'



export default function BurgerMenu() {

    const [open, setOpen] = useState(false)


    return (
        <div className="burger" open={open} onClick={() => setOpen(!open)} >
            <div />
            <div />
            <div />
        </div>
    )
}
