
import React from 'react'

import './MassageBox.scss'

const MassageBox = (props) => {

    return (
     <div className={`alert alert-${props.variant || 'info'}`}>
         {props.children}
     </div>
    )
}

export default MassageBox