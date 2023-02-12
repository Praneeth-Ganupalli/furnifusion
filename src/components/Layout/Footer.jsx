import React from 'react'

function Footer() {
    const year=new Date().getFullYear();
  return (
        <div className="p-3 bg-dark text-center text-white">
            &copy; {year} <strong className='text-custom__primary'>
            Furni Fusion
              </strong> All Rights Reserved
        </div>
  )
}

export default Footer