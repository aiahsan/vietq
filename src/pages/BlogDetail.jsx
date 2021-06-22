import React, { useEffect, useState } from 'react';
import Footer from '../components/home/footer'
import Nav from '../components/navbar'
// import { makeStyles } from "@material-ui/core";
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { GrLinkedinOption } from 'react-icons/gr';
import { FaInstagram } from 'react-icons/fa';
import { useLocation, useHistory } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay';
function BlogDetail(props) {

    const location = useLocation();
    const history = useHistory();
    let [blog, setBlog] = useState({});

    
    useEffect(() => {
        if (location.state) {
            console.log(location.state)
            setBlog(location.state)
        }
        else {
            history.replace('/')
        }
    },[]);
    //     return (
    //         blog ? <div>
    //             <div className="bgimgcoverBlogDetail">
    //                 {//Top Section
    //                 }
    //                 <div className="pd6p navback-color zIndex3" >
    //                     <Nav hasback={true} />
    //                 </div>
    //                 <div className="pd6p zIndex3">
    //                     <div className="py-5 d-flex flex-column justify-content-center align-items-center">
    //                         <h1 className="h-headtext pt-md-5">{blog.title?blog.title:""}<br /> {blog.slug?blog.slug:""}</h1>
    //                         <div className='writerInfo d-md-flex'>
    //                             <div className='mr-3 mr-md-5'>
    //                                 <b>
    //                                     Authot:
    //                        </b>
    //               {blog.user&&blog.user.name?blog.user.name:""}
    //                 </div>
    //                             <div>
    //                                 <b>
    //                                     Published:
    // </b>
    // {blog.date_created?blog.date_created.slice(0, 10):""}
    // </div>
    //                         </div>
    //                         <div className='socialMedia-Icons mt-3 pb-md-5'>
    //                             <FaFacebookF />
    //                             <FaTwitter />
    //                             <GrLinkedinOption />
    //                             <FaInstagram />
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className='container text-left'>

    //             <div className="mt-5" dangerouslySetInnerHTML={ { __html:blog.full_content?blog.full_content:""}} >

    //             </div>
    //                   <div className='blogDetailsImages'>
    //                     <div className='img60'></div>
    //                     <div className='img40'></div>
    //                 </div>
    //             </div>
    //            <div className="pd6p mt-5 pt-5">
    //            <Footer />
    //            </div>


    //         </div>
    //             : <></>
    //     );
    return (<LoadingOverlay>
        <div>
            <div className="bgimgcoverBlogDetail">
                {//Top Section
                }
                <div className="pd6p navback-color zIndex3" >
                    <Nav hasback={true} />
                </div>
                <div className="pd6p zIndex3">
                    <div className="py-5 d-flex flex-column justify-content-center align-items-center">
                        <h1 className="h-headtext pt-md-5">{blog.meta_description?blog.meta_description:""}</h1>
                        <h3 className="h-headtext">{blog.short_content?blog.short_content:""}</h3>
                        <div className='writerInfo d-md-flex'>
                            <div className='mr-3 mr-md-5'>
                                <b>
                                    Authot:
                           </b>
                  Ali
                    </div>
                            <div>
                                <b>
                                    Published:
</b>
{blog.date_created?blog.date_created.slice(0,10):""}
</div>
                        </div>
                        <div className='socialMedia-Icons mt-3 pb-md-5'>
                            <FaFacebookF />
                            <FaTwitter />
                            <GrLinkedinOption />
                            <FaInstagram />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container text-left'>
                  <div className="mt-5" dangerouslySetInnerHTML={ { __html:blog.full_content?blog.full_content:""}} >

   </div>
           </div>
            <Footer />
        </div>
        </LoadingOverlay>
    );
}

export default BlogDetail;