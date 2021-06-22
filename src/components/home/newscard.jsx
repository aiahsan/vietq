import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import { deepOrange, deepPurple } from '@material-ui/core/colors';
import {FaRegCalendarAlt} from 'react-icons/fa'
const useStyles = makeStyles({
  root: {
    maxWidth: 530,
    width:'100%'
  },
  media: {
    height: 336,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card onClick={props.onClick} className={[classes.root,"revcardd"]} >

      <CardActionArea >
      <div>
       <CardMedia
          className="mediass1-2112wwe"
          image={props.img}
          title="Contemplative Reptile"
        />
       </div>
        
        <CardContent>
       <div className='d-flex aline-items-center'>
       <Typography gutterBottom className="newsavatar">
        <Avatar src={props.userImage}/>
       <h5 className="newsavatartitle activty-lbl-cst-name-c2 color-prmry2"> {props.desig}</h5>
         </Typography>
          <Typography gutterBottom className="revsubdesig activty-lbl-cst-name-c1 color-prmry2 d-flex align-items-center">
            {props.subdesig}
            </Typography>
       </div>
          <Typography gutterBottom className="revtitle heading-child2-semibold MuiTypography-body1 mt-n2 f1rem">
             {props.title}
            </Typography>   
          <Typography variant="body2" color="textSecondary" component="p" className="revdesc activty-lbl-cst-name-c2 color-prmry2 mt-n2">
       <FaRegCalendarAlt className="mt-n1" size={20}/> {props.date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}