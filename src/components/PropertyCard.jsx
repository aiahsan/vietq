import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import imgOne from '../images/property/property1.jpg'
import { GoLocation } from 'react-icons/go';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
 
  content:{
     
      left:0,
      right:0,
      bottom:0,
      padding:0,
  },
  price:{
position:"relative",
fontSize:'1.5rem',
color:'white' ,
fontWeight:'bold',
left:'20px',     
textAlign:'left',
top:-50,
zIndex:13
// marginBottom:'.75rem'
  }
});

export default function PropertyCard({ item,img, title, location, fetures, price, type,ptype }) {


  const classes = useStyles();
  const history = useHistory();

  const PriceCom = () => {
      if (type === 1) {
          return price;
      }
      else {
          return <>{price}<span className="font-weight-600">/mo</span></>
      }
  }
  return (
    <Card className={classes.root} onClick={()=>history.push("/property",{item:item})}>
      <CardActionArea>
       <div>
       <CardMedia
          className="mediass1-2112wwe"
          image={img}
          title="Contemplative Reptile"
        />
       </div>
        
        {
          ptype&&ptype!=""?<div className="cardbadge">
            {ptype}
          </div>:<></>
        }
        
        <div className={classes.price}>
    ${PriceCom()}
    </div>
        <CardContent className={classes.content}>
    
<div className='bg-white pb-3 pl-3 pr-3'>
    
<Typography noWrap={true} gutterBottom variant="h5"  component="h4" className='font-weight-bold asds8yh23-412sd '>
{title}
          </Typography>
          <Typography noWrap={true} className="text-left" variant="body2" color="textSecondary" component="p">
            <GoLocation className='mr-2 text-left'/>
            {location}
          </Typography>

        <Typography noWrap={true} className="text-secondary tex-left">
        {fetures.map(x =>x.feature.name +" : "+x.value+" ")}
        </Typography>

        {/* <div className='text-secondary d-flex justify-content-between'>
        {fetures.map(x =><div>{x.feature.name}:{x.value}</div>)}
        </div> */}
</div>
</CardContent>
      </CardActionArea>
    </Card>
  );
}