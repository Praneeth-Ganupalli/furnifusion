import React from 'react'

function Card(props) {
  return (
   <div className="card p-3 me-3 bg-light text-black">
        <div className="card-body">
            {props.children}
        </div>
   </div>
  )
}

export default Card