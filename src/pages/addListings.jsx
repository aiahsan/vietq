import React, { useState, useEffect } from 'react';
import {
    Row, Col, Label, Input, FormGroup
} from 'reactstrap';
import 'react-tagsinput/react-tagsinput.css'
import * as Bt from 'reactstrap'

import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { repository } from '../utiles/repository'
import ImageUploader from 'react-images-upload';
import { useSelector, useDispatch } from 'react-redux'
import LoadingBar from 'react-top-loading-bar'
import NotificationAlert from 'react-notification-alert';
import Heading5 from '../components/home/heading5';
import Footer from '../components/home/footer'
import Nav from '../components/navbar'
import TagsInput from 'react-tagsinput'

let cstErrors;
const DisplayingErrorMessagesSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.string().required('Required'),
    category_id: Yup.string().required('Required'),

});



const GetFilters = (feature, handleFilter) => {

    if (feature.input_type)
        switch (feature.input_type) {
            case 'dropdown': {
                return <div className="col-md-6" >
                    <div className="form-group" controlId="exampleForm.ControlSelect2">
                        <label>{feature.name}</label>
                        <select className="form-control" onChange={(e) => handleFilter({
                            feature_id: feature.id,
                            value: e.target.value,
                            type: feature.input_type,
                        })}>
                            {
                                feature.options ? feature.options.map(x => <option value={x} >{x}</option>) : <></>
                            }
                        </select>


                    </div>

                </div>
            }
            case 'range': {
                return <div className="col-md-6">
                    <div className="form-group" >
                        <label>{feature.name}</label>
                        <div className="dsp-flex align-cntr" style={{ display: 'flex' }}>

                            <input className="form-control mr-2" type="number" onChange={e => handleFilter({
                                feature_id: feature.id,
                                value: e.target.value,
                                type: feature.input_type,
                            }, 0)} min={feature.options[0] ? feature.options[0] : 0} placeholder="Min" />
                            <input className="form-control" type="number" onChange={e => handleFilter({
                                feature_id: feature.id,
                                value: e.target.value,
                                type: feature.input_type,
                            }, 1)} max={feature.options[1] ? feature.options[1] : 0} placeholder="Max" />
                        </div>
                    </div>

                </div>

            }
            case 'radio': {
                return <div className="col-md-6">

                    <div className="form-group">
                        <label>{feature.name}</label>
                        {
                            feature.options ? feature.options.map(x =>
                                <>

                                    <input className=""
                                        onChange={() => handleFilter({
                                            feature_id: feature.id,
                                            value: x,
                                            type: feature.input_type,
                                        })}
                                        type="radio"
                                        label={x}
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        style={{ marginLeft: 10 }}
                                    />
                                    <label>{x}</label>
                                </>) : <></>
                        }
                    </div>

                </div>

            }
            case 'checkbox': {
                return <div className="col-md-6">
                    <div>
                        <label>{feature.name}</label>
                        {
                            feature.options ? feature.options.map(x =>
                                <>
                                    <input
                                        onClick={() => handleFilter({
                                            feature_id: feature.id,
                                            value: x,
                                            type: feature.input_type,
                                        }, "check")}
                                        type="checkbox"
                                        label={x}
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        style={{ marginLeft: 10 }}
                                    />
                                    <label>{x}</label>
                                </>) : <></>
                        }
                    </div>



                </div>

            }
            default:
                return 0
        }
}


export default () => {
    const [loaderMain, setloaderMain] = useState(false);
    const [image, setimage] = useState(null);
    const [pictures, setpictures] = useState([]);
    const [subCategory, setsubCategory] = useState([]);
    const [filters, setfilters] = useState([]);
    const [categories, setcategories] = useState([]);
    const [showAnimation, setshowAnimation] = React.useState(false);
    const [tags, settags] = useState([]);
    const [progress, setProgress] = useState(0)
    const refContainer = React.useRef(null);
    const user = useSelector(x => x.User);

    let [mapData, setMapData] = useState({
        attributes: [],
    });
    const handleChange = (tags) => { settags(tags) }

    const geoDecode = async () => {
        setshowAnimation(true);
        const geolocation = navigator.geolocation;
        geolocation.getCurrentPosition(
            async position => {
                //    setlocationCoords(position.coords);
                const { data, status } = await repository.geoDecode(position.coords.latitude, position.coords.longitude).then(x => x).then(x => x);
                if (status === 200) {
                    if (data && data.address && data.address.city) {

                        setMapData({ ...mapData, address: data.display_name, latitude: data.lat, longitude: data.lon, city: data.address.city, town: data.address.town })
                        //  setLocationGet({ location: data.address.city, type: 0 });
                    }
                    else if (data && data.address && data.address.town) {

                        setMapData({ ...mapData, address: data.display_name, latitude: data.lat, longitude: data.lon, city: "", town: data.address.town })
                    }
                    else {

                        //show modal
                    }
                }
                else {
                }
                setshowAnimation(false);
            },
            () => {
                alert("Please allow location access");
            }
        );


    }
    const postData = async (datapost) => {
        setProgress(50);

        console.log(pictures);
        let imagesMain = [];
        // pictures.map(async x => {

        //     const base64img = await toBase64(x).then(x => x);
        //     const img=JSON.stringify(base64img);
        //     console.log(img,"ssssssxxxx")
        //     imagesMain.push(img)
        // });


        const newImagesPromises = []
        for (let i = 0; i < pictures.length; i++) {
            newImagesPromises.push(fileToDataUri(pictures[i]))
        }


        const newImages = await Promise.all(newImagesPromises)
        let features = [];
        mapData.attributes.map(x => {
            console.log(x);
            features.push({ ...x, value: typeof x.value == "object" ? [...x.value] : [x.value] })
        });

        console.log(newImages, "ssssssss");
        const postData = { ...datapost };
        // postData.images = imagesMain;
        postData.images = newImages;
        postData.features = features;
        postData.latitude = mapData.latitude ? mapData.latitude : "";
        postData.longitude = mapData.longitude ? mapData.longitude : "";
        postData.city = mapData.city ? mapData.city : "";
        postData.town = mapData.town ? mapData.town : "";
        postData.address = mapData.address ? mapData.address : "";
        console.log(postData, "post");
        const { data, status } = await repository.add_product(postData).then(x => x).then(x => x);
        console.log(data, "dddd");
        if (data && data.status == 200 && data.success == true) {
            setProgress(100);
            notify("tr", 1, data.message);
            setshowAnimation(false)
            if (data.response) {
                // dispatch(updateUser(data.response.user));
                // alert(data.message)
                // dispatch(saveToken(data.response.user.token));
            }

        }
        else {
            notify("tr", 4, data.message);

            setshowAnimation(false)
            setProgress(100);
        }


    }

    const handleFilter = (filterObj, range) => {

        let oldFilters = mapData.attributes;
        let foundFilter = oldFilters.find(x => x.feature_id === filterObj.feature_id);
        if (foundFilter) {
            if (foundFilter.type === "checkbox") {
                let checkBoxValueExsist = foundFilter.value.find(x => x === filterObj.value)
                if (checkBoxValueExsist) {
                    foundFilter.value = foundFilter.value.filter(x => x !== checkBoxValueExsist)
                }
                else {
                    foundFilter.value.push(filterObj.value);
                }

            }
            else if (foundFilter.type === "range") {
                if (range === 0)//minimum
                {
                    foundFilter.value[0] = parseInt(filterObj.value);
                }
                else if (range === 1) {
                    foundFilter.value[1] = parseInt(filterObj.value);
                }
            }
            else
                foundFilter.value = filterObj.value;
        }
        else {
            if (range === 0 || range === 1) {
                if (range === 0) {
                    oldFilters.push({ ...filterObj, value: [parseInt(filterObj.value), mapData.max] });

                }
                else if (range === 1)
                    oldFilters.push({ ...filterObj, value: [0, parseInt(filterObj.value)] });
            }
            else if (range === "check") {
                oldFilters.push({ ...filterObj, value: [filterObj.value] });
            }

            else
                oldFilters.push(filterObj);
        }
        setMapData({ ...mapData, attributes: oldFilters });

        console.log(mapData.attributes, "Sdsd");

    }
    const notify = (place, color, message) => {

        var type;
        switch (color) {
            case 1:
                type = 'primary';
                break;
            case 2:
                type = 'success';
                break;
            case 3:
                type = 'danger';
                break;
            case 4:
                type = 'warning';
                break;
            case 5:
                type = 'info';
                break;
            default:
                break;
        }
        var options = {};
        options = {
            place: place,
            message: (
                <div className="notification-msg">
                    <div>
                        {message}
                    </div>
                </div>
            ),
            type: type,
            icon: "",
            autoDismiss: 500,
        }
        refContainer.current.notificationAlert(options);
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });

    const fileToDataUri = (image) => {
        return new Promise((res) => {
            const reader = new FileReader();
            const { type, name, size } = image;
            reader.addEventListener('load', () => {
                res(reader.result.split(',')[1])
            });
            reader.readAsDataURL(image);
        })
    }

    useEffect(() => {
        geoDecode();
        const getData = async () => {
            const { data, status } = await repository.getCategories().then(x => x).then(x => x);
            if (status === 200) {
                console.log(data.response.categories);
                setcategories(data.response.categories);
                setsubCategory(data.response.categories[0] && data.response.categories[0].sub_categories ? data.response.categories[0].sub_categories : []);
                setfilters(data.response.categories[0] && data.response.categories[0].attributes ? data.response.categories[0].attributes : []);
            }

        }
        getData();

    }, []);

    const handleCategoryChange = (id) => {
        let subCate = categories.find(x => x.id == id);
        console.log(subCate, "sss");
        console.log(id);
        if (subCate) {

            setsubCategory(subCate.sub_categories ? subCate.sub_categories : []);
            setfilters(subCate.attributes ? subCate.attributes : []);
        }
    }
    const handleSubCategoryChange = (id) => {
        let subCate = subCategory.find(x => x.id == id);
        console.log(subCate, "sss");
        console.log(id);
        if (subCate) {
            setfilters(subCate.attributes ? subCate.attributes : []);
        }
    }

    return (loaderMain ? <></> :

        <>
            <div className="bgimgcoverlisting media2sss1-2112wwe2 ">


                <div className="pd6p navback-color zIndex3" >
                    <Nav hasback={true} />
                </div>

                <div className="pd6p zIndex3 ">
                    <div className="pb-8p">
                        <h1 className="headtext mb-0">Add Listing</h1>
                        <h5 className="headtextchild ">Home/Add Listing</h5>
                    </div>
                </div>

            </div>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    price: '',
                    prop_features: [],
                    category_id: '',
                    exclusive: 0,
                    prop_type:'',

                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    await postData(values)
                }}
            >
                {({ errors, touched, getFieldProps, setFieldValue, initialValues, handleSubmit, values }) => {
                    cstErrors = errors;

                    return (

                        <div className="container mt-5" >
                            <Heading5 title="Detailed Information" classes="form-head-main" />
                            <div className="row">
                                <div className="col-md-12">
                                    <Form>
                                        <LoadingBar color="#f11946" progress={progress} height={5} onLoaderFinished={() => setProgress(100)} />

                                        <NotificationAlert className="sdfsdfdsf" ref={refContainer} />






                                        <div>
                                            <div className="content">
                                                <Row>
                                                    <Col xs={12} md={12}>







                                                        <div className="row margin-0">
                                                            <div className="col-12">
                                                                <section className="box ">

                                                                    <div className="content-body">
                                                                        <div className="row">
                                                                            <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">

                                                                                <div className="form-row">

                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="inputname4">Category</label>
                                                                                        <select className="form-control" name="category" onChange={(e) => {
                                                                                            handleCategoryChange(e.target.value)
                                                                                        }} >
                                                                                            <option value={0} >Select Category</option>

                                                                                            {categories.map(x => <option value={x.id} key={x.id}>{x.name}</option>)}
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="inputname4">Sub Category</label>
                                                                                        <select className="form-control" name="category" onChange={(e) => {
                                                                                            handleSubCategoryChange(e.target.value)
                                                                                            setFieldValue("category_id", e.target.value)
                                                                                        }} >
                                                                                            <option >Select Sub Category</option>
                                                                                            {subCategory.map(x => <option value={x.id} key={x.id}>{x.name}</option>)}
                                                                                        </select>
                                                                                        {touched.category_id && errors.category_id && <div style={{ color: 'red', marginTop: 10 }}>{errors.category_id}</div>}
                                                                                    </div>

                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="inputname4">Title</label>
                                                                                        <input  {...getFieldProps("title")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                                        {touched.title && errors.title && <div style={{ color: 'red', marginTop: 10 }}>{errors.title}</div>}

                                                                                    </div>
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="inputname4">Description</label>
                                                                                        <textarea  {...getFieldProps("description")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                                        {touched.description && errors.description && <div style={{ color: 'red', marginTop: 10 }}>{errors.description}</div>}

                                                                                    </div>
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="inputname4">Price</label>
                                                                                        <input  {...getFieldProps("price")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                                        {touched.price && errors.price && <div style={{ color: 'red', marginTop: 10 }}>{errors.price}</div>}

                                                                                    </div>
                                                                                    <div className="form-group col-md-6">
                                                                                        <div  >
                                                                                            <label htmlFor="inputname4">Features</label>

                                                                                            <TagsInput value={values.prop_features} inputProps={{ placeholder: 'Add features' }} onChange={(e) => setFieldValue('prop_features', e)} />

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="form-group col-md-6"  controlId="exampleForm.ControlSelect2">
                                                                                        <label>Property Type</label>
                                                                                        <select className="form-control" onChange={(e)=>{
                                                                                            setFieldValue("prop_type",e.target.value)
                                                                                        }} >
                                                                                            <option  >Select property type</option>
                                                                                            <option value="Rent" >Rent</option>
                                                                                            <option value="Sell" >Sell</option>
                                                                                        </select>


                                                                                    </div>
                                                                                    {/* <div className="form-group col-md-6">
                                                                                        <label htmlFor="inputname4">Latitude</label>
                                                                                        <input  {...getFieldProps("latitude")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                                        {touched.latitude && errors.latitude && <div style={{ color: 'red', marginTop: 10 }}>{errors.latitude}</div>}

                                                                                    </div>
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="inputname4">Longitude</label>
                                                                                        <input  {...getFieldProps("longitude")} type="text" className="form-control" id="inputname4" placeholder="" />
                                                                                        {touched.longitude && errors.longitude && <div style={{ color: 'red', marginTop: 10 }}>{errors.longitude}</div>}

                                                                                    </div>
                                                                                    */}
                                                                                    <FormGroup check>
                                                                                        <Label check style={{ marginTop: 30 }}>
                                                                                            <Input onChange={(e)=>setFieldValue("exclusive",values.exclusive==0?1:0)} type="checkbox" />
Make Exclusive
</Label>
                                                                                    </FormGroup>


                                                                                </div>

                                                                                <div className="row">
                                                                                    <div >

                                                                                    </div>
                                                                                    <div className="dsp-flex dsp-flex-wrap ml-n3 mt-4" style={{
                                                                                        display: 'flex',
                                                                                        flexWrap: 'wrap'
                                                                                    }}>

                                                                                        {
                                                                                            filters.map(x => GetFilters(x, handleFilter))

                                                                                        }



                                                                                    </div>
                                                                                    <ImageUploader
                                                                                        withIcon={true}
                                                                                        buttonText='Choose images'
                                                                                        onChange={(x) => {
                                                                                            setpictures(pictures.concat(x))
                                                                                        }}
                                                                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                                                        maxFileSize={5242880}
                                                                                        withPreview={true}
                                                                                    />
                                                                                    <Heading5 title="Contact Details" classes="form-head-main mt-4" />

                                                                                    <div className="w-100   ">
                                                                                        <div className="form-group mt-4" controlId="formBasicEmail">
                                                                                            <label className="form-label">Name</label>
                                                                                            <input className="form-control" type="text" readOnly={true} value={user.name} placeholder="Enter Name" />

                                                                                        </div>

                                                                                        <div className="row">
                                                                                            <div className="col-md-6">
                                                                                                <div className="form-group" controlId="formBasicEmail">
                                                                                                    <label className="form-lavel">Email address</label>
                                                                                                    <input className="form-control" type="email" readOnly={true} value={user.email} placeholder="Enter email" />

                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-6">

                                                                                                <div className="form-group" controlId="formBasicEmail">
                                                                                                    <label className="form-lavel">Phone(optional)</label>
                                                                                                    <input className="form-control" type="text" readOnly={true} value={user.phone} placeholder="Enter Phone number" />

                                                                                                </div>

                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="dsp-flex mt-3">
                                                                                    <button type="button" onClick={handleSubmit} className="btn btn-info themeBackgroundColor listingbtn">
                                                                                        Publish
    </button>
                                                                                </div>

                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </section></div>


                                                        </div>







                                                    </Col>

                                                </Row>
                                            </div>
                                        </div>


                                    </Form>

                                </div>
                            </div>

                        </div>
                    )

                }}
            </Formik>
            <Footer />
        </>

    )

}
