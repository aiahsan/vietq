import React,{useEffect} from "react";
import { geolocated, geoPropTypes } from 'react-geolocated';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import {useDispatch,useSelector} from 'react-redux';


const getDirection = (degrees, isLongitude) =>
    degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

// adapted from http://stackoverflow.com/a/5786281/2546338
// const formatDegrees = (degrees, isLongitude) =>
//     `${0 | degrees}° ${
//         0 | (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)
//     }' ${0 | (((degrees * 60) % 1) * 60)}" ${getDirection(
//         degrees,
//         isLongitude,
//     )}`;
const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const getCurrentPosition = () => {
    const geolocation = navigator.geolocation;

    geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      () => {
        console.log(new Error("Permission denied"));
      }
    );
  };

 
const Demo = (props) =>{ 
    // const dispatch=useDispatch();
    const classes = useStyles();
    // const locationGet=useSelector(x=>x.userLocation);

  const [open, setOpen] = React.useState(true);
 
    const setLocation=(data)=>{ 
    // 


}


  const handleClose = () => {
    setOpen(false);
  };  
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  useEffect(()=>{
    getCurrentPosition();
  },[])
  return (
    <div
      
    >
       {/* <div id="overlay">
       <Lottie id="ltv" animationData={LocationAnimation} loop autoplay />
       </div> */}
        {!props.isGeolocationAvailable ? (
              <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Geolocation</h2>
                  <p id="transition-modal-description">Your browser does not support Geolocation.</p>
                </div>
              </Fade>
            </Modal>
        ) : !props.isGeolocationEnabled ? (
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Geolocation</h2>
                <p id="transition-modal-description">Geolocation is not enabled.</p>
              </div>
            </Fade>
          </Modal>
        ) : props.coords ? (
            <div>
                                   {setLocation(props.coords)}
            </div>
        ) : (
            <div></div>
        )}
       
    </div>
);}

Demo.propTypes = { ...Demo.propTypes, ...geoPropTypes };

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Demo);