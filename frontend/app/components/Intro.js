import React from 'react'
import Image from 'next/image'


/*
   Hello world in js
*/
export default function Intro () {
    return (
        <>
         
        <div id={`carouselExampleControls d-flex`} className={`carousel slide mt-2 `} data-bs-ride={`carousel`}>
          
           <div className={`carousel-inner`}>
           <div className={`carousel-item active `}>
           {/* <img src={`/static/Snap (6).png`} className={`d-block w-100`} alt={`...`} height = {"500"}/> */}
           
           <div className = {`d-block w-100 carousel_img `}>
             <Image src={`/static/Snap (6).jpg`}  className = {`rounded-img`} alt = {`...`}  layout ="fill" quality={100} priority/>
           </div>
          
          </div>
          <div className={`carousel-item`}>
          <Image src={`/static/Snap (6).jpg`}  alt = {`...`}  layout ="fill" quality={100} />
          </div>
           <div className={`carousel-item`}>
           <Image src={`/static/Snap (6).jpg`}  alt = {`...`}  layout ="fill" quality={100} />
             </div>
             
        </div>
       
         <button className={`carousel-control-prev`} type={`button`} data-bs-target={`#carouselExampleControls`} data-bs-slide={`prev`}>
            <span className={`carousel-control-prev-icon`} ></span>
            <span className={`visually-hidden`}>Previous</span>
         </button>
        
        <button className={`carousel-control-next`} type={`button`} data-bs-target={`#carouselExampleControls`} data-bs-slide={`next`}>
         <span className={`carousel-control-next-icon`} ></span>
          <span className={`visually-hidden`}>Next</span>
           </button>
           
        </div>
        
        </>
    )
}


