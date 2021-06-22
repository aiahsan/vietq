import React from 'react';
import Heading5 from '../components/home/heading5'
import TCorner from '../images/app/lfcr.png'
import BCorner from '../images/app/btcr.png';
import Card from '@material-ui/core/Card';
// import { makeStyles } from '@material-ui/core/styles';
import { FaFacebook} from 'react-icons/fa';
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import logo from '../images/logovtq.png';
import { Formik, Form } from 'formik';
import * as Bootstrap from 'react-bootstrap'
import * as Yup from 'yup';
import { repository } from '../utiles/repository';
import {  useDispatch } from 'react-redux';
import { Login, saveToken } from '../redux/actionMethodes/User/index'
import {Link} from 'react-router-dom'
// let cstErrors;
import NotificationAlert from 'react-notification-alert';
import LoadingBar from 'react-top-loading-bar'
import {useHistory} from 'react-router-dom'
const DisplayingErrorMessagesSchema = Yup.object().shape({

 
    username: Yup.string()
    .required('Required').email(),
});

// const useStyles = makeStyles({
//     root: {
//         minWidth: 275,
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//     },
//     title: {
//         fontSize: 14,
//     },
//     pos: {
//         marginBottom: 12,
//     },
// });
const MyLogin = () => {
    // const classes = useStyles();
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
    // const classes = useStyles();
    const refContainer = React.useRef(null);
    const [progress, setProgress] = React.useState(0)

    const dispatch = useDispatch();
    const history=useHistory();
    const postCat = async (datapost) => {
        setProgress(50);

        const { data, status } = await repository.forgot_password(datapost).then(x => x).then(x => x)

        if (data && data.status === 200 && data.success === true) {
            setProgress(100);
            history.push('/verification',{data:{pin:data.response.pin.pin,
            username:datapost.username}})
        }
        else {
            setProgress(100);
            notify("tr", 4, data.message);
        }

    }
    
return <div>
        <img src={TCorner} className="topCorner-img" alt='img' />
        <img src={BCorner} className="btCorner-img" alt='img' />
        <div className="center-element">
            <img src={logo} className="mb-4"  alt='img'/>
            <Card className="px-md-5 px-2 pb-2 pt-3 txt-algn-lft">
                <Formik
                    initialValues={{
                        username: '',
                        
                    }}
                    validationSchema={DisplayingErrorMessagesSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        await postCat(values)
                    }}
                >
                    {({ errors, touched, getFieldProps }) => {
                        // cstErrors = errors;

                        return (
                            <Form>
  <LoadingBar color="#f11946" progress={progress} height={5} onLoaderFinished={() => setProgress(100)} />

<NotificationAlert className="sdfsdfdsf" ref={refContainer} />

                                <Heading5 classes="headlogin" title="Forgot Password" />
                                <Heading5 classes="headloginsub mt-5" title="Email" />
                                <input {...getFieldProps("username")} className="form-control max-width" />
                                {touched.username && errors.username && <div style={{ color: 'red', marginTop: 10 }}>{errors.username}</div>}

                               <button type="submit" className="mt-3 btn btn-info themeBackgroundColor listingbtn w-100">Request verification code</button>
                                <p className="color-prmry2 pt-1 txt-algn-center">Or</p>
                                
                                <p className="pt-1 txt-algn-center"><span className="color-prmry2 ">Dont have an account?</span><span className="color-prmry4 h5"><Link to="/register">Create a New One</Link></span></p>

                            </Form>
                        )

                    }}
                </Formik>

            </Card>
        </div>

    </div>
}
export default MyLogin;