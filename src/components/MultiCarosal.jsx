import React from 'react';
import Carousel from "react-multi-carousel";
import PropertyCard from "./PropertyCard";
import "react-multi-carousel/lib/styles.css";
import Fade from 'react-reveal/Fade';

function MultiCarosal({ Exclusive,property }) {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (
        <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 1"
            transitionDuration={500}
            arrows={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            //   deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
              {
            property.map(x => <div className="p-2">
              <Fade right>
                <PropertyCard item={x} img={x.images[0] ? x.images[0].image : "https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png"} title={x.title ? x.title : ""} location={`${x.address ? x.address : ""}`} fetures={x.attributes ? x.attributes : []} price={x.price ? x.price : ""} type={0} />
              </Fade>
            </div>)
          }
     
            
            

        </Carousel>
    );
}

export default MultiCarosal;