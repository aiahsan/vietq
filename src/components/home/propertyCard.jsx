import React from 'react';
// import Heading5 from './heading5';
import { RiMapPinLine } from 'react-icons/ri'
import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from "react-router-dom";

const FeatureFun = ({ name, val }) => {
    return <h5 className="property-location-p mr-4">{name}:{val}</h5>
}
export default function PropertyCard ({ item,img, title, location, fetures, price, type }) {
    const history = useHistory();

    const PriceCom = () => {
        if (type === 1) {
            return price;
        }
        else {
            return <>{price}<span className="font-weight-600">/mo</span></>
        }
    }
    return (<CardActionArea onClick={()=>history.push("/property",{item:item})}><div>
        <div className="containercity">
            <div className="propertyTypeBar ml-4"><h5 className="toppropertyType-text">
                {type === 1 ? "Sale" : "Rent"}
            </h5></div>
            <div className="centeredcityoverlayBox"></div>

            <img src={img} alt="cityImg" className="w-100" />
            <div className="bottompropertyPrice pl-4"><h5 className="bottompropertyPrice-text">
                ${PriceCom()}
            </h5></div>

        </div>
    </div>
        <div className="txt-algn-lft bg-white pl-4 pt-4">
            <h5 className="heading-child2">{title}</h5>
            <h5 className="property-location-p"><RiMapPinLine className="mr-2" />{location}</h5>
            <div className="dsp-flex dsp-flex-wrap"> {fetures.map(x => <FeatureFun name={x.feature && x.feature.name?x.feature.name:""} val={x.value} />)}

            </div>
        </div>
    </CardActionArea>)
}