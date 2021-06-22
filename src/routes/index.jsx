import Home from '../pages/home';
import Blogs from '../pages/blogs';
import MarketPlace from '../pages/marketplace'
import Discovery from '../pages/discover';
import Login from '../pages/login'
import Forgot from '../pages/forgot'
import Privacy from '../pages/privacy'
import Terms from '../pages/terms'
import Verify from '../pages/verify'
import Confirm from '../pages/confirm'
import Signup from '../pages/signup'
import BlogDetail from '../pages/BlogDetail'
import Property from '../pages/PropertyDetails'
import BlankPage from '../pages/blankpage'
var BASEDIR = process.env.REACT_APP_BASEDIR;

var indexRoutes = [
    { path: BASEDIR+"/login", name: "Login", component: Login },
    { path: "/login", name: "Login", component: Login },
    { path: BASEDIR+"/forgot", name: "forgot", component: Forgot },
    { path: "/forgot", name: "forgot", component: Forgot },
    { path: BASEDIR+"/privacy", name: "privacy", component: Privacy },
    { path: "/privacy", name: "privacy", component: Privacy },
    { path: BASEDIR+"/terms", name: "terms", component: Terms },
    { path: "/terms", name: "terms", component: Terms },
    { path: BASEDIR+"/verification", name: "verification", component: Verify },
    { path: "/verification", name: "verification", component: Verify },
    { path: BASEDIR+"/confirm", name: "changepass", component: Confirm },
    { path: "/confirm", name: "changepass", component: Confirm },
    { path: BASEDIR+"/blog", name: "Blog", component: BlogDetail },
    { path: "/blog", name: "Blog", component: BlogDetail },
    { path: BASEDIR+"/blogs", name: "Blog", component: Blogs },
    { path: "/blogs", name: "Blogs", component: Blogs },
    { path: BASEDIR+"/market", name: "Market", component: MarketPlace },
    { path: "/market", name: "Market", component: MarketPlace },
    { path: BASEDIR+"/register", name: "Register", component: Signup },
    { path: "/register", name: "Register", component: Signup },
    { path: BASEDIR+"/discover", name: "Discover", component: Discovery },
    { path: "/discover", name: "Discover", component: Discovery},
    { path: BASEDIR+"/property", name: "property", component: Property },
    { path: "/property", name: "property", component: Property},
    { path: BASEDIR+"/404", name: "404", component: BlankPage },
    { path: "/404", name: "404", component: BlankPage },
    { path: BASEDIR+"/", name: "Home", component: Home },
    { path: "/", name: "Home", component: Home },
];


export default indexRoutes;
