import React from 'react'
import HomeStartContent from './HomeStartContent'
import FeaturedContent from './FeaturedContent';
import SiteMottoContent from './SiteMottoContent'; 
import NewsLetter from './NewsLetter';
import "./Home.css"
function HomeContent() {
  return (
    <>
    <section>
        <HomeStartContent />
    </section>
    <section className='bg-light featured-products-section'>
       <FeaturedContent />
    </section>
    <section className='mt-2  bg-custom__primary text-white'>
        <SiteMottoContent />
    </section>
    <section className='join-us-section p-5'>
        <NewsLetter />
    </section>
    </>
  )
}

export default HomeContent