import React,{useState} from 'react';
import Heading5 from '../components/home/heading5'
import TCorner from '../images/app/lfcr.png'
import BCorner from '../images/app/btcr.png';
import Card from '@material-ui/core/Card';
// import { makeStyles } from '@material-ui/core/styles';
import { FaGooglePlusG } from 'react-icons/fa';
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import logo from '../images/logovtq.png';
import { Formik, Form } from 'formik';
import * as Bootstrap from 'react-bootstrap'
import * as Yup from 'yup';
import { repository } from '../utiles/repository';
import { useDispatch } from 'react-redux';
import { Login, saveToken } from '../redux/actionMethodes/User/index'
import {Link} from 'react-router-dom';
// let cstErrors;
import NotificationAlert from 'react-notification-alert';
import LoadingBar from 'react-top-loading-bar'

const DisplayingErrorMessagesSchema = Yup.object().shape({

    name: Yup.string().required('Required'),
    username: Yup.string().required('Required').email(),
    email: Yup.string()
        .required('Required').email(),
    phone: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required').matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),

    confirmPassword: Yup.string()
        .required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
const Signup= () => {
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
    const [progress, setProgress] = useState(0)

    const dispatch = useDispatch();
    const postCat = async (datapost) => {
        setProgress(50);

        const { data, status } = await repository.register(datapost).then(x => x).then(x => x)

        console.log(data, status)
        if (data && data.status === 200 && data.success === true) {
            setProgress(100);
            if (data.response.user) {
                dispatch(Login(data.response.user));
                dispatch(saveToken(data.response.user.token));
            }

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
            <img src={logo} className="mb-4" alt='img' />
            <Card className="px-md-5 px-2 pb-2 pt-3 txt-algn-lft">
                <Formik
                    initialValues={{
                        name: '',
                        username: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword:'',
                        role:2
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

                                <Heading5 classes="headlogin" title="Create New Account" />

                                <div className="row mt-5">
                                    <div className="col-md-6">
                                        <Heading5 classes="headloginsub" title="Name" />
                                        <input {...getFieldProps("name")} className="form-control" />
                                        {touched.name && errors.name && <div style={{ color: 'red', marginTop: 10,maxWidth:320 }}>{errors.name}</div>}

                                    </div>
                                    <div className="col-md-6">
                                        <Heading5 classes="headloginsub" title="Phone Number" />
                                        <input className="form-control" {...getFieldProps("phone")} />
                                        {touched.phone && errors.phone && <div style={{ color: 'red', marginTop: 10,maxWidth:320 }}>{errors.phone}</div>}

                                    </div>
                                    </div>
                                <div className="row mt-4">
                                <div className="col-md-6">
                                        <Heading5 classes="headloginsub" title="Email" />
                                        <input {...getFieldProps("username")} className="form-control" />
                                        {touched.username && errors.username && <div style={{ color: 'red', marginTop: 10,maxWidth:320 }}>{errors.username}</div>}

                                    </div>
                               
                                    <div className="col-md-6">
                                        <Heading5 classes="headloginsub" title="Email For Receiving Updates" />
                                        <input {...getFieldProps("email")} className="form-control" />
                                        {touched.email && errors.email && <div style={{ color: 'red', marginTop: 10,maxWidth:320 }}>{errors.email}</div>}

                                    </div>
                                    
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <Heading5 classes="headloginsub" title="Password" />
                                        <input {...getFieldProps("password")} className="form-control" />
                                        {touched.password && errors.password && <div style={{ color: 'red', marginTop: 10,maxWidth:320 }}>{errors.password}</div>}

                                    </div>
                                    <div className="col-md-6">
                                        <Heading5 classes="headloginsub" title="Confirm Password" />
                                        <input {...getFieldProps("confirmPassword")} className="form-control" />
                                        {touched.confirmPassword && errors.confirmPassword && <div style={{ color: 'red', marginTop: 10,maxWidth:320 }}>{errors.confirmPassword}</div>}

                                    </div>
                                </div>
                               

                                <Bootstrap.Form.Group controlId="formBasicCheckbox">
                                    <Bootstrap.Form.Check type="checkbox" className="mt-2 color-prmry2" label="I agree to the term & conditions of VietQ" />
                                </Bootstrap.Form.Group>
                                <button className="btn btn-info themeBackgroundColor listingbtn w-100">Sign in</button>
                                <p className="color-prmry2 pt-1 txt-algn-center">Or</p>
                                <div className="dsp-flex dsp-justify-space-center">
                                <FaGooglePlusG color="#ee665b" size="30" className="mr-1" />
                                                </div>
                               
                                <p className="pt-1 txt-algn-center"><span className="color-prmry2 ">Have an account</span><span className="color-prmry4 h5"> <Link to="/login">Login</Link></span></p>
                            </Form>
                        )

                    }}
                </Formik>

            </Card>
        </div>

    </div>
}
export default Signup;