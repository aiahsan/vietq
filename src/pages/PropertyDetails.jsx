import React from 'react';
import PropertyCarosal from "../components/PropertyCarosal";
import MultiCarosal from '../components/MultiCarosal';
import Footer from '../components/home/footer'
import Nav from '../components/navbar'
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay';
import {repository} from '../utiles/repository'
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiYWlhaHNhbiIsImEiOiJja2h3MHh6OW4xamVrMzVsaHA5YndpazAwIn0.HVr7tA9bRUKmyQ8suFr6DA',
});
function PropertyDetails(props) {
    const [item, setitem] = React.useState();
    const history = useHistory();
    let [display, setdisplay] = React.useState(false);
    let [property, setproperty] = React.useState([]);

    React.useEffect(() => {
        console.log(props,"prp");
            setdisplay(true);
        if (props.location && props.location.state && props.location.state.item) {
            setitem(props.location.state.item);
            const getData=async ()=>{
                const { data, status } = await repository.productsFilter({}).then(x => x).then(x => x);
            if (status === 200) {
              setproperty(data.response.products);
              setdisplay(false);

            }
            else
            {   
                setdisplay(false);
            }
            }
            getData();
        }
        else {

            history.replace('/')
            
        }
        setdisplay(false);
    }
        , []);

    return (<LoadingOverlay active={display}
        spinner
        text='Loading...'>
                <div>
            <div className="pd6p navback-color" >
                <Nav hasback={true} />
            </div>
            <PropertyCarosal type={item&&item.prop_type?item.prop_type:""} images={item&& item.images ? item.images :[]}  title={item&& item.title ? item.title : ""} price={item&& item.price ? item.price : ""} description={item&&item.description ? item.description : ""} />
            <div className="container text-left mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <div>
                            <h3>
                                Description
                </h3>
                            <p>
                                {item&&item.description ? item.description : ""}
                            </p>

                        </div>
                        <div className='mt-3'>
                            <h3>
                                Property Details
            </h3>
                            <div className='d-flex flex-wrap justify-content-between'>
                              
                              {
                                  item&& item.attributes?item.attributes.map(x=>  <div className='propertyDec'>
                                  <div>
                                      {x.feature.name}:
                                  </div>
                                      {x.value}
                                  </div>):<></>
                              }
                              
                                    </div>

                        </div>
                        <div className='mt-3'>
                            <h3>
                                Facilities
                            </h3>
                            <div className='d-flex flex-wrap flex-column flex-row justify-content-between'>
                                {
                                  item&&item.features&&  item.features!=null?item.features.map((x,i)=>  <div key={i} className='propertyDec'> {x}
                                    </div>
                             ):<></>
                                }

                            </div>

                        </div>
                   
                    </div>
                    <div className="col-md-4">
                        <div className='rounded border p-2'>
                            <h3>
                                Location
</h3>
                            <div className='myMap'>
                            <Map
                style={"mapbox://styles/mapbox/streets-v8"}
                containerStyle={{
                    height: '100%',
                    width: '100%'
                }}
                Mapbox
                zoom={[13]}
                center={[item&&item.longitude?item.longitude:108.2772,item&& item.latitude?item.latitude:14.0583]}
            >
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                    <Feature coordinates={[item&&item.longitude?item.longitude:"", item&&item.latitude?item.longitude:""]} />
                </Layer>
            </Map>
    
                            </div>
                        </div>
                        <h4 className="mt-3">
                            Share
                        </h4>
                        <div className="mySharLinks">
                            <FaFacebookF />
                            <FaTwitter />
                            <FaInstagram />
                        </div>
                    </div>
                </div>
                <div className='mt-3 mb-5'>
                    <h3 className='mb-3'>
                        Related Properties
</h3>
                    <div>
                        <MultiCarosal property={property} />
                    </div>
                </div>
            </div>
                <Footer />
        </div>
  
        </LoadingOverlay>
      );
}

export default PropertyDetails;