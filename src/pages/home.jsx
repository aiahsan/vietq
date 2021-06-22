import React, { useEffect, useState } from 'react';

import TcCard from '../components/home/topCategoryCard';
import { BiCurrentLocation } from 'react-icons/bi';
import Heading1 from '../components/home/heading1';
import Heading5 from '../components/home/heading5';
import CityBox from '../components/home/cityBox';
import city1 from '../images/cities/city1.jpg'
import City2 from '../images/cities/city2.jpg'
import City3 from '../images/cities/city3.jpg'
import City4 from '../images/cities/city4.jpg'
import logo from '../images/logovtq.png'

// import PropertyImg1 from '../images/property/property1.jpg'
// import PropertyCard from '../components/home/propertyCard'
import ActivityCard from '../components/home/activityCard';
import img1 from '../images/activityImages/1.jpg';
import img2 from '../images/activityImages/2.jpg';
import img3 from '../images/activityImages/3.jpg';
import News from '../components/home/newscard'
import Footer from '../components/home/footer';
import { useSelector, useDispatch } from 'react-redux'
import { repository } from '../utiles/repository'
import { setCategories, setBlogs, setExclusiveProducts } from '../redux/actionMethodes/listings';
import { useHistory } from "react-router-dom";
import NavBar from '../components/navbar'
// import _ from 'lodash';
import LoadingOverlay from 'react-loading-overlay';
import { makeStyles } from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import HomeMulti from '../components/home/HomeMulti';
const useStyles = makeStyles(() => ({
  inputCity: {
    width: '40%'
  }
}))
const Home = () => {
  const classes = useStyles();
  const categories = useSelector(x => x.categories);
  const blogs = useSelector(x => x.blogs);
  const exclusive = useSelector(x => x.exclusive);

  // const userLocation=(x=>x.userLocation);

  //0 for city 1 for town
  //big radius small radius
  let [locationGet, setLocationGet] = useState({ location: '', type: 0 });
  let [search, setsearch] = useState("");
  let [property, setproperty] = useState([]);
  let [display, setdisplay] = useState(false);
  let [locationCoords,setlocationCoords]=useState();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const getData = async () => {
      setdisplay(true);

      if (categories.length <= 0) {
        const { data, status } = await repository.getCategories().then(x => x).then(x => x);
        if (status === 200) {

          dispatch(setCategories(data.response.categories));
        }

      }
      if (blogs.length <= 0) {
        const { data, status } = await repository.get_blogs().then(x => x).then(x => x);
        if (status === 200 && data.success==true) {
          dispatch(setBlogs(data.response.blogs));
          setBlogs(data.response.blogs)
        }
        else
        {
        }

      }
      if (exclusive.length <= 0) {
        const { data, status } = await repository.getexclusive().then(x => x).then(x => x);
        if (status === 200) {
          dispatch(setExclusiveProducts(data.response.products));
          // const ex=  _.sample(data.response.products,3);
          // console.log(ex,"sds")  
          setproperty(data.response.products);
        }
      }
      else {
        // const ex=  _.sample(exclusive,3);
        // console.log(ex,"sds")  
        setproperty(exclusive);
      }
      setdisplay(false);

    }
    getData();
  },[]);
  
  
  const geoDecode = async () => {
    setdisplay(true);
 const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(
     async position => {
       setlocationCoords(position.coords);
      const { data, status } = await repository.geoDecode(position.coords.latitude, position.coords.longitude).then(x => x).then(x => x);
      if (status === 200) {
        if (data && data.address && data.address.city) {
          
          setLocationGet({ location: data.address.city, type: 0 });
        }
        else if (data && data.address && data.address.town) {
  
          setLocationGet({ location: data.address.town, type: 1 });
  
        }
        else {
          //show modal
        }
      }
      else {
      }
      setdisplay(false);
      },
      () => {
        console.log(new Error("Permission denied"));
      }
    );
   

  }


  const searchNow = async (cate,city) => {
    setdisplay(true);
    let dataFilter = {
      name: search,
      city: locationGet.location,
      latitude: locationCoords&&locationCoords.latitude?locationCoords.latitude:"",
      longitude:  locationCoords&&locationCoords.longitude?locationCoords.longitude:"",
      type: locationGet.type,
      
    }
    if(cate && cate!="")
    {
      dataFilter.category_id=cate;
    }
   if(city && city!="")
    {
      dataFilter.city=city;
      dataFilter.type=1;
      delete dataFilter.latitude;
      delete dataFilter.longitude;
    }
    const { status, data } = await repository.productsFilter(dataFilter).then(x => x).then(x => x);
    if (status === 200 && data.status === 200 && data.success === true) {
      history.push("/discover", { data: { ...dataFilter, latitude: locationCoords&&locationCoords.latitude?locationCoords.latitude:"", longitude: locationCoords&&locationCoords.longitude?locationCoords.longitude:"",serhResult:search!=""?search:locationGet.type==1?"Town: "+locationGet.location:locationGet.location }, response: data.response });
    }
    else
    {
       console.log(data,"eree")
    }
    setdisplay(false);
  }

  return <LoadingOverlay
    active={display}
    spinner
    text='Loading...'
  ><div className="bgimgcover">
      {//Top Section
      }
      <div className="pd6p">
        <Fade top>
          <NavBar />
        </Fade>
        <Fade right>
          <div className="pb-8p">
            <h1 className="headtext">Explore Vietnam</h1>
            <h5 className="headtextchild mt-3 ">Let's uncover the best places to eat, drink, and shop nearest to you.</h5>
            <div className="mt-3 pt-3">
              <div className="flex-main flx-none flex-mainback pl-4  pd-custm-25">
                <div className="flex-main flex-width-55 pt-2 pb-2 wd-md100 brdb-737" >
                  <p className="margin-auto font-weight-600">
                    What
                  </p>
                  <input value={search} onChange={(e) => setsearch(e.target.value)} placeholder="For Example Food, Service, Barber, hotel" className="form-control no-border searchBarText" />
                </div>
                <div className={`${classes.inputCity} flex-main flex-width-22 brdleft brd-cstm-737 pl-5rem hbtn-54 wd-md100 brdb-737 `}  >
                  <p className="margin-auto font-weight-600">
                    Where
                  </p>
                  <input placeholder="Your City" value={locationGet.location} onChange={(e) => setLocationGet({ location: e.target.value, type: 0 })} className={`form-control no-border searchBarText`} />
                  <button className="btn" onClick={() => geoDecode()}>
                    <BiCurrentLocation />
                  </button>
                </div>
                <div className="flex-main flex-width-20 wd-md100 " ><button onClick={() => searchNow()
                } className="btn btn-info themeBackgroundColor listingbtn w-100 brdleftbtnnone hbtn-54 br-serch-10">Search</button></div>
              </div>
            </div>
            <h5 className="headtextchild mt-5 pt-3 ftsize-17rem">Still looking? here are some suggestions for you</h5>
            <div className="categoryContainer">
              {
                categories.length > 0 ? categories.map((x, i) => <TcCard onClick={() => searchNow(x.id)} key={i} img={x.image} title={x.name} />) : <></>
              }
            </div>
          </div>
        </Fade>
      </div>
    </div>
    {
      //happing Cities
    }

    <div >
      <Fade right>
        <Heading1 title="Happening Cities" /></Fade>
      <Fade right>
        <Heading5 title="Cities You Must Explore This Summer" />
      </Fade>
      <div className="pd6p pb-5">
        <div className="row">
          <Fade left>
            <div className="col-md-4 mt-3 mt-md-5"><CityBox hascustom={true} onClick={()=>searchNow("","Ho Chi Minh")} img={city1} title="Ho Chi Minh" /></div>
          </Fade>
          <Fade right>
            <div className="col-md-8 mt-3 mt-md-5"><CityBox hascustom={false} onClick={()=>searchNow("","Hanoi")} img={City2} title="Hanoi" /></div>
          </Fade>
        </div>
        <div className="row">
          <Fade left>
            <div className="col-md-8 mt-3 mt-md-5"><CityBox hascustom={false} onClick={()=>searchNow("","Da Nang")} img={City3} title="Da Nang" /></div>
          </Fade>
          <Fade right>
            <div className="col-md-4 mt-3 mt-md-5"><CityBox hascustom={true} onClick={()=>searchNow("","Phu Quoc")} img={City4} title="Phu Quoc" /></div>
          </Fade>
        </div>
      </div>
    </div>

    {
      //Exclusive section
    }
    <div className="exclusive-box mt-5 pt-4 pb-5">
      <Fade left>
        <Heading1 title="Exclusive" />
      </Fade>
      <Fade left>
        <Heading5 title="Popular Exclusive Listings In Our Directory" />
      </Fade>
      <div className="pd6p">
    <HomeMulti property={property}/>
     </div>
    </div>

    {//activities section
    }

    <div className="mt-5 pt-4 pb-5">
      <Fade right>
        <Heading5 title="What people are Viewing and Reviewing" />
      </Fade>
      <div className="pd6p">
        <div className="row justify-content-center mt-3">
          <div className="col-12 col-md-6 col-lg-4 px-md-1">
            <Fade right>
              <ActivityCard img={img1} desig="Admin" subdesig="Write A Review" title="Osteria De Busta" detail="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" read="Continue Reading" />
            </Fade>
          </div>
          <div className="col-12 col-md-6 col-lg-4 px-md-1">
            <Fade top>
              <ActivityCard img={img2} desig="Admin" subdesig="Write A Review" title="Giano Restaurant" detail="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" read="Continue Reading" />
            </Fade>
          </div>
          <div className="col-12 col-md-6 col-lg-4 px-md-1">
            <Fade left>
              <ActivityCard img={img3} desig="Admin" subdesig="Write A Review" title="Da Vinci" detail="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" read="Continue Reading" />
            </Fade>
          </div>
        </div>
      </div>
    </div>

    {
      //Blog and News section
    }
    <div className="mt-5 pb-5 ">
      <Fade right>
        <Heading1 title="News & Tips" />
      </Fade>
      <Fade left>
        <Heading5 title="Checkout Latest News And Articles From Our Blog" />
      </Fade>
      <div className='pd6p'>
        <div className="row mt-5">
          {
            blogs.length > 0 ? blogs.map((x, i) => <Fade right><div ket={i} className="col-12 col-md-6 col-lg-4 px-md-1">
              <News onClick={() => history.push("/blog", x)} img={x.cover_image ? x.cover_image : "https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png"} userImage={x.user && x.user.image ? x.user.image : "https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png"} desig={x.user && x.user.name ? x.user.name : ""} subdesig={x.category && x.category.name ? x.category.name : ""} title={x.title ? x.title : ""} date={x.date_created ? x.date_created.slice(0, 10) : ""} />
            </div></Fade>) : <></>
          }

          {/* <div className="col-12 col-md-6 col-lg-4 px-md-1">
        <News img={newsimg2} desig="Admin" subdesig="Coffee, Health & Care, Uncategorized" title="Reduce Unwanted Wrinkles" date="February 23, 2018" />
        </div>
        <div className="col-12 col-md-6 col-lg-4 px-md-1">
        <News img={newsimg3} desig="Admin" subdesig="News, Uncategorized" title="Excited news about arrival fashion." date="January 23, 2017" />
        </div> */}
        </div>
      </div>
    </div>
    {
      //Footer section
    }

    <Footer />


  </LoadingOverlay>

}
export default Home;