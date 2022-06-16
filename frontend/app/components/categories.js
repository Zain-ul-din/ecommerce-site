import React from 'react'
import Image from 'next/image'


export function Category () {
    return (
       
        <div className={`card p-2`} style={{'width': '18rem'}}>
           <Image className={`card-img-top`} src={`/static/cardImage.png`} alt={`Card image cap`} layout = 'responsive' width={'18rem'} height = {'10'}/>
           <div className={`card-body text-center`}>
               <h3 className={`card-title `}>Card title lore some data meta</h3>
           <a className = {`text-underline`} href={`#`}>Shop Now </a>
       </div>
       </div>
    )
} 

export default function Categories () {
    return (
        <>
        <div className='m-3'> <h3 className={`text-center fw-bold`}>Top Categories</h3> </div>

                    <div className={`container`}>
                    <div className={`row`}>
                     <div className={`col`}>
                       <Category/>
                    </div>
                    <div className={`col`}>
                      <Category/>
                    </div>
                    <div className={`col`}>
                     <Category/>
                    </div>
                    </div>
       </div>
         
        </>
    )
}


