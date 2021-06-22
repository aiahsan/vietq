import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Fade from 'react-reveal/Fade';

function PropertyCarosal({title,description,price,images,type}) {
    // style={{backgroundImage:"url(abc.jpg)"}}
    return (
        <Carousel>
            {images?images.map(i=>{
                return <Carousel.Item>
                    <Fade right>
                <div className='CarouselOne media2sss1-2112wwe1' style={{backgroundImage:`url(${i.image})`}}></div>
                <Carousel.Caption>
                    <div className='mybadge'>
                       {type}
                    </div>
                    <h3 className='CarouselHeading'>{title?title:""}</h3>
                    <p className='CarouselParagraph'>{description?description.slice(0,50)+"...":""}</p>
               <h3>
                   ${price}
               </h3>
                </Carousel.Caption>
                </Fade>
            </Carousel.Item>
            }):<></>}
        </Carousel>
    )
}

export default PropertyCarosal;