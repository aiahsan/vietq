import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap'
import Footer from '../components/home/footer'
import Nav from '../components/navbar';
import Heading5 from '../components/home/heading5';

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { Dropdown, DropdownButton } from 'react-bootstrap'
import 'mapbox-gl/dist/mapbox-gl.css';
import { BiCurrentLocation } from 'react-icons/bi';
// import PropertyImg1 from '../images/property/property1.jpg'
import PropertyCard from '../components/PropertyCard';
import { useLocation } from 'react-router-dom'
import { repository } from '../utiles/repository';
import _ from 'lodash';
// import ImageUploader from 'react-images-upload';
import LoadingOverlay from 'react-loading-overlay';

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiYWlhaHNhbiIsImEiOiJja2h3MHh6OW4xamVrMzVsaHA5YndpazAwIn0.HVr7tA9bRUKmyQ8suFr6DA',
});
// const position = [51.505, -0.09]


// const feat = [{ name: "Bed", val: "4" }, { name: "Bath", val: "1" }, { name: "Sqft", val: "200" }];

const GetFilters = (feature, handleFilter) => {

    if (feature.input_type)
        switch (feature.input_type) {
            case 'dropdown': {
                return <div className="mr-5"  >
                    <Form.Group controlId="exampleForm.ControlSelect2 wd-198">
                        <Form.Label>{feature.name}</Form.Label>
                        <Form.Control as="select" onChange={(e) => handleFilter({
                            feature_id: feature.id,
                            value: e.target.value,
                            type: feature.input_type,
                        })}>
                            {
                                feature.options ? feature.options.map(x => <option value={x} >{x}</option>) : <></>
                            }

                        </Form.Control>

                    </Form.Group>
                    {/* <DropdownButton id="category-discovery" title="Real Estate sdas">
                    {
                        feature.options ? feature.options.map(x => <Dropdown.Item onClick={() => handleFilter({
                            feature_id: feature.id,
                            value: x,
                            type: feature.input_type,
                        })}>{x}</Dropdown.Item>) : <></>
                    }
                </DropdownButton> */}
                </div>
            }
            case 'range': {
                return <div className="mr-5" >
                    <Form.Group>
                        <Form.Label>{feature.name}</Form.Label>
                        <div className="dsp-flex align-cntr">

                            <input className="form-control mr-2" onChange={e => handleFilter({
                                feature_id: feature.id,
                                value: e.target.value,
                                type: feature.input_type,
                            }, 0)} min={feature.options[0] ? feature.options[0] : 0} placeholder="Min" />
                            <input className="form-control" onChange={e => handleFilter({
                                feature_id: feature.id,
                                value: e.target.value,
                                type: feature.input_type,
                            }, 1)} max={feature.options[1] ? feature.options[1] : 0} placeholder="Max" />
                        </div>
                    </Form.Group>

                </div>

            }
            case 'radio': {
                return <div className="mr-5" >

                    <Form.Group>
                        <Form.Label>{feature.name}</Form.Label>
                        {
                            feature.options ? feature.options.map(x =>
                                <Form.Check
                                    onChange={() => handleFilter({
                                        feature_id: feature.id,
                                        value: x,
                                        type: feature.input_type,
                                    })}
                                    type="radio"
                                    label={x}
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                />) : <></>
                        }
                    </Form.Group>

                </div>

            }
            case 'checkbox': {
                return <div className="mr-5">
                    <Form.Group>
                        <Form.Label>{feature.name}</Form.Label>
                        {
                            feature.options ? feature.options.map(x =>
                                <Form.Check
                                    onClick={() => handleFilter({
                                        feature_id: feature.id,
                                        value: x,
                                        type: feature.input_type,
                                    }, "check")}
                                    type="checkbox"
                                    label={x}
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                />) : <></>
                        }
                    </Form.Group>



                </div>
            }
            default:
                return 0;
        }
}

const Discover = () => {
    const location = useLocation();
    let [mapData, setMapData] = useState({
        name: '',
        city: '',
        latitude: 24.8606113,
        longitude: 67.0635721,
        type: 0,
        state: '',
        price: [0, 0],
        attributes: [],
        category_id: '',
        max: 10000,
        serhResult: "",
        page_no: 1,
    });

    let [display, setdisplay] = useState(false);
    let [listings, setlistings] = useState([]);
    let [datalistings, setdatalistings] = useState([]);
    // let [filters, setfilters] = useState([]);
    let [attributes, setattributes] = useState([]);
    let [statesC, setstatesC] = useState([]);
    let [cityC, setcityC] = useState([]);
    let [categoryC, setcategoryC] = useState([]);
    let [subcategoryC, setsubcategoryC] = useState([]);

    useEffect(() => {
        setdisplay(true);
        if (location && location.state && location.state.response && location.state.response.products && location.state.response.attributes) {


            setlistings(location.state.response.products);
            setdatalistings(location.state.response.products);
            // setattributes(location.state.response.attributes);
            setstatesC(location.state.response.states);
            setcategoryC(location.state.response.categories)
            setsubcategoryC(location.state.response.categories && location.state.response.categories[0].sub_categories ? location.state.response.categories[0].sub_categories : [])


            if (location.state.data) {
                setMapData({ ...mapData, ...location.state.data })
            }


        }
        else {

            const getData = async () => {
                const { status, data } = await repository.productsFilter({}).then(x => x).then(x => x);
                if (status === 200 && data.status === 200 && data.success === true) {
                    if (data.response && data.response.products && data.response.attributes) {
                        setlistings(data.response.products);
                        setdatalistings(data.response.products);
                        setattributes([...data.response.attributes]);
                        setstatesC(data.response.states);

                    }
                }
            }
            getData();

        }
        setdisplay(false);

    }, []);

    const handleCityChange = (id, val) => {
        setMapData({ ...mapData, city: val })
        setlistings(datalistings.filter(x => x.city == val));
    }
    const handleStateChange = (id) => {
        const stateFound = statesC.find(x => x.id == id);
        if (stateFound) {
            if (stateFound.cities)
                setcityC(stateFound.cities)

        }
    }
    const handleCategoryChange = (id) => {
        const categoryFound = categoryC.find(x => x.id == id);
        if (categoryFound) {
            if (categoryFound.sub_categories) {
                setsubcategoryC(categoryFound.sub_categories)
            }



        }
    }
    const handleSubCategoryChange = (id) => {
        const categoryFound = subcategoryC.find(x => x.id == id);
        if (categoryFound) {

            setMapData({ ...mapData, category_id: id })
            if (categoryFound.attributes)
                // console.log(categoryFound)   
                setattributes(categoryFound.attributes)

        }
        setlistings(datalistings.filter(x => x.category_id == id));
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

        let filterdProducts = _.filter(datalistings, (x) => {
            let found = false;
            for (let i = 0; i < oldFilters.length; ++i) {
                let foundObj = x.attributes.find(y => y.feature_id == oldFilters[i].feature_id);
                if (foundObj) {
                    switch (oldFilters[i].type) {
                        case 'dropdown':
                            {
                                if (foundObj.value == oldFilters[i].value) {
                                    found = true;
                                }
                                else {
                                    found = false;
                                }
                                break;
                            }
                        case 'range':
                            {

                                if (foundObj.value >= oldFilters[i].value[0] && foundObj.value <= oldFilters[i].value[1]) {
                                    found = true;
                                }
                                else
                                    found = false;
                                break;
                            }
                        case 'radio':
                            {

                                if (foundObj.value == oldFilters[i].value) {
                                    found = true;
                                }
                                else
                                    found = false;
                                break;
                            }
                        case 'checkbox':
                            {

                                if (oldFilters[i].value.find(z => z == foundObj.value)) {
                                    found = true;
                                }
                                else
                                    found = false;

                                break;
                            }

                    }
                    if (found == false)
                        break;
                }
                else {
                    found = false;
                    break;
                }

            }

            if (found == true) return x;
        })
        // console.log(oldFilters, "olddd")
        setlistings(filterdProducts);
        // console.log(filterdProducts, "filter products")



    }

    const handleFilterMore = async (type) => {
        setdisplay(true);
        let newMapData = { ...mapData };

        if (type) {
            setMapData({ ...mapData, page_no: 0 });
            newMapData.page_no = 0;

        }
        if (mapData.category_id == "") {
            delete newMapData.category_id;
        }
        if (mapData.name == "") {
            delete newMapData.name;
        }
        if (mapData.city == "") {
            delete newMapData.city;
            delete newMapData.type;
            delete newMapData.latitude;
            delete newMapData.longitude;

        }

        if (mapData.latitude == "") {
            delete newMapData.latitude;
        }
        if (mapData.longitude == "") {
            delete newMapData.longitude;
        }
        if (mapData.state == "") {
            delete newMapData.state;
        }
        const { data, status } = await repository.productsFilter(newMapData, mapData.page_no).then(x => x).then(x => x);
        if (status === 200) {

            if (data.success == true) {
                if (data.response && data.response.products) {
                    let newUpdatedData = [...datalistings, ...data.response.products];
                    setdatalistings(newUpdatedData);
                    setlistings(newUpdatedData);
                    setMapData({ ...mapData, page_no: mapData.page_no += 1 })
                }
            }
            setdisplay(false);
        }
        else {
            setdisplay(false);
        }
    }

    const geoDecode = async () => {
        setdisplay(true);
        const geolocation = navigator.geolocation;
        geolocation.getCurrentPosition(
            async position => {
                setMapData({ ...mapData, latitude: position.coords.latitude, longitude: position.coords.longitude });
                const { data, status } = await repository.geoDecode(position.coords.latitude, position.coords.longitude).then(x => x).then(x => x);
                if (status === 200) {
                    if (data && data.address && data.address.city) {
                        setMapData({ ...mapData, city: data.address.city, type: 0 });

                    }
                    else if (data && data.address && data.address.town) {

                        setMapData({ ...mapData, city: data.address.city, type: 1 });

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
                setdisplay(false);

            }
        );


    }

    return <LoadingOverlay
        active={display}
        spinner
        text='Loading...'
    >

        <div className="bgimgcovermarketPlace media2sss1-2112wwe2 ">


            <div className="pd6p navback-color zIndex3" >
                <Nav hasback={true} />
            </div>

            <div className="pd6p zIndex3 ">
                <div className="pb-8p">
                    <h1 className="headtext">Marketplace</h1>
                    <h5 className="headtextchild mt-3 ">Home/Marketplace</h5>
                </div>
            </div>

        </div>
        {/* <div className="mt-5 pt-3 pd6p">
            <div className="flex-main flx-none flex-mainback pl-4  pd-custm-25 brd ">
                <div className="flex-main flex-width-55 pt-2 pb-2 wd-md100 brdb-737" ><p className="margin-auto font-weight-600">What</p><input value={mapData.name} onChange={(e) => setMapData({ ...mapData, name: e.target.value })} placeholder="For Example Food, Service, Barber, hotel" className="form-control no-border searchBarText" /></div>
                <div className="flex-main flex-width-22 brdleft brd-cstm-737 pl-5rem hbtn-54 wd-md100 brdb-737 " ><p className="margin-auto font-weight-600">Where</p><input placeholder="Your City" value={mapData.city} onChange={(e) => setMapData({ ...mapData, city: e.target.value })} className="form-control no-border searchBarText" /><button onClick={() => geoDecode()} className="btn"><BiCurrentLocation /></button></div>
                <div className="flex-main flex-width-20 wd-md100 " ><button className="btn btn-info themeBackgroundColor listingbtn w-100 brdleftbtnnone hbtn-54 br-serch-10" onClick={() => { handleFilterMore(1) }}>Search</button></div>
            </div>
        </div>
        <div className="footer-root mt-5 pb-4 pd6p">
            <p className="ft-size-125"> Search Result for<span className="font-weight-600"> {mapData.serhResult}</span></p>


            <DropdownButton id="category-discoverydst" title={categoryC[0] ? categoryC[0].name : "Explore"}>
                {categoryC.map(x => <Dropdown.Item onClick={() => handleCategoryChange(x.id ? x.id : 0)}>{x.name ? x.name : ""}</Dropdown.Item>)}
            </DropdownButton>
        </div>
        <div className="footer-root pd6p">
            <div className="dsp-flex align-cntr dsp-flex-wrap">
                <p className=""> <span className="font-weight-600"> Advance Filters</span></p>
                <DropdownButton id="category-discoverydst1" title="State">
                    {statesC.map(x => <Dropdown.Item onClick={() => handleStateChange(x.id ? x.id : 0)}>{x.name ? x.name : ""}</Dropdown.Item>)}

                </DropdownButton>
                <DropdownButton id="category-discoverydst1" title="City">
                    {cityC.map(x => <Dropdown.Item onClick={() => handleCityChange(x.id ? x.id : 0, x.name ? x.name : "")}>{x.name ? x.name : ""}</Dropdown.Item>)}
                </DropdownButton>

                <DropdownButton id="category-discoverydst1" title="Category">
                    {subcategoryC.map(x => <Dropdown.Item onClick={() => handleSubCategoryChange(x.id ? x.id : 0)}>{x.name ? x.name : ""}</Dropdown.Item>)}
                </DropdownButton>


            </div>

        </div>
        <h5 className="footer-root1 pd6p">{attributes.length > 0 ? "Filters" : ""}</h5>
        <div className="footer-root1 pd6p mt-4">


            {

                attributes.map(x => GetFilters(x, handleFilter))
            }
        </div> */}
        <div className="row">
            <div className="col-md-8">
                <div className="row pd6p ">
                    {listings.map(x => <div className="col-md-6 mt-5">
                        <PropertyCard item={x} img={x.images[0] ? x.images[0].image : "https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png"} title={x.title ? x.title : ""} location={`${x.address ? x.address : ""}`} fetures={x.attributes ? x.attributes : []} price={x.price ? x.price : ""} type={0} />
                    </div>)}

                </div>
            </div>
            <div className="col-md-4 pt-5">
                <div className="p-4 border-simple revcardd">
                    <Heading5 classes="form-head-main-center" title="Search Marketplace" />
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
        <div className="mt-5" ><button onClick={() => handleFilterMore()} className="btn btn-info themeBackgroundColor listingbtn hbtn-54 br-serch-10">Load More</button></div>

        <div className="mt-5 pt-5">
            <Footer />
        </div>
    </LoadingOverlay>
}
export default Discover;