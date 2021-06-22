import React, { useEffect, useState } from 'react';
import Heading5 from '../components/home/heading5';
// import { Form, Button } from 'react-bootstrap'
import Footer from '../components/home/footer'
import Nav from '../components/navbar';
import News from '../components/home/newscard'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { repository } from '../utiles/repository';
import { setBlogs } from '../redux/actionMethodes/listings/index'
import { useDispatch } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';

export default function Blogs() {
    const blogs = useSelector(x => x.blogs);
    let [pageblogs, setpageblogs] = useState([]);
    let [display, setdisplay] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        setdisplay(true);

        const getData = async () => {

            if (blogs.length <= 0) {
                const { data, status } = await repository.get_blogs().then(x => x).then(x => x);
                if (status === 200) {

                    dispatch(setBlogs(data.response.blogs));
                    setpageblogs(data.response.blogs);
                }

            }

        }
        if (blogs.length > 0) {
            setpageblogs(blogs)
        }
        else {
            getData()
        }
        setdisplay(false);

    }, []);
    return <LoadingOverlay
        active={display}
        spinner
        text='Loading...'
    >

        <div className="bgimgcoverblog media2sss1-2112wwe2 ">


            <div className="pd6p navback-color zIndex3" >
                <Nav hasback={true} />
            </div>

            <div className="pd6p zIndex3 ">
                <div className="pb-8p">
                    <h1 className="headtext">Blogs</h1>
                    <h5 className="headtextchild mt-3 ">Home/Blogs</h5>
                </div>
            </div>

        </div>



        <div className="pd6p mt-5 pt-5">
            <div className="row m-0">
                <div className="col-md-8">

                    <div className="mt-5 pb-5 ">
                        <div className="row mt-5">

                            {pageblogs.length > 0 ? pageblogs.map((x, i) => <div className='col-12 col-md-6 '>
                                <News onClick={() => history.push("/blog", x)} img={x.cover_image ? x.cover_image : "https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png"} userImage={x.user && x.user.image ? x.user.image : "https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png"} desig={x.user && x.user.name ? x.user.name : ""} subdesig={x.category && x.category.name ? x.category.name : ""} title={x.title ? x.title : ""} date={x.date_created ? x.date_created.slice(0, 10) : ""} />

                            </div>) : <></>}

                        </div>
                    </div>
                </div>
                <div className="col-md-4 pt-5">
                    <div className="p-4 border-simple revcardd">
                        <Heading5 classes="form-head-main-center" title="Search Blogs" />
                        <input className="form-control" placeholder="Search" />
                    </div>
                    <div className="mt-5 p-4 border-simple revcardd">
                        <Heading5 classes="form-head-main-center" title="Suggesions" />
                        <div className="dsp-flex dsp-flex-wrap">
                            <button className="btn btn-info themeBackgroundColor listingbtn mr-2 mt-2">Appartments</button>
                            <button className="btn btn-info themeBackgroundColor listingbtn mr-2 mt-2">Residencial</button>
                            <button className="btn btn-info themeBackgroundColor listingbtn mr-2 mt-2">Lifestyle</button>
                            <button className="btn btn-info themeBackgroundColor listingbtn mr-2 mt-2">Commercial</button>
                            <button className="btn btn-info themeBackgroundColor listingbtn mr-2 mt-2">Luxary</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <Footer />
    </LoadingOverlay>
}