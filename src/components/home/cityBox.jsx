import React from 'react';
import Img from 'react-cool-img';
import loadingImage from '../../images/spnr.gif';

// import Heading5 from './heading5';
import CardActionArea from '@material-ui/core/CardActionArea';
export default function CityBox ({ img, title,onClick,hascustom }){
    let [isload,setisload]=React.useState(false);
    return (<CardActionArea onClick={()=>onClick()} className={hascustom?"btn-cust-img-dasf88":""} ><div className={hascustom?"htnciy-cs97923 containercity":"containercity"}>
    <div  className={hascustom?"centeredcityoverlayBox gjhhgjkt7t7itg":"centeredcityoverlayBox"}></div>
    <div  className={hascustom?"isdafi323uuf-fasd cardActionImg":"cardActionImg "}>
    <Img cache={true} onLoad={()=>setisload(true)} src={img} alt="cityImg" placeholder={loadingImage} className={isload?hascustom?"asdfhi3y83s w-100":"w-100":""} />
    </div>
    <div  className={hascustom?"bsadrw3ui-fasf centeredcitytextimg":"centeredcitytextimg"} ><h5 className={hascustom?"centeredcitytext":"centeredcitytext"}>
    {title}
        </h5></div>
</div></CardActionArea>)
}