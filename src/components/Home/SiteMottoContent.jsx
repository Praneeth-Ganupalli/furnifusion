import React, { Fragment } from 'react'
import { HOME_PAGE_CARDS } from '../../helpers/constants'
import Card from '../UI/Card'
function SiteMottoContent() {
  return (
   <div className="container p-4 h-25">
       <div className="row mt-4">
        <div className="col-md-4">
            <h3>Cutom Furniture <br>
            </br>Built Only for you</h3>
        </div>
        <div className="col-md-5 ms-auto">
            <p className="lead">Furnifusion offers stylish and affordable furniture options for modern and traditional homes. Dedicated to providing a seamless shopping experience, Furnifusion makes furniture shopping easy and enjoyable.</p>
        </div>
       </div>
       <div className="row mt-4">
         {HOME_PAGE_CARDS.map(card=>{
            return <Fragment key={card.name}>
            <div className="col-md-4 mb-2">
            <Card>
             <section className='text-justify'>
             <h3 className='d-flex flex-column text-center mb-2'>
              <span className='icon-wrapper'>{card.icon}</span>
                <span className='mt-2'> {card.name}</span>
              </h3>
              <p className="lead">
                {card.content}</p> 
             </section>
               
            </Card>
            </div>
            
            </Fragment>
         })}
       </div>
   </div>
  )
}

export default SiteMottoContent