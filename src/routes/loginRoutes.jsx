import Home from '../pages/home';
import Listings from '../pages/addListings'
import Blogs from '../pages/blogs';
import MarketPlace from '../pages/marketplace'
import Discovery from '../pages/discover';
import BlogDetail from '../pages/BlogDetail'
import Property from '../pages/PropertyDetails'
import BlankPage from '../pages/blankpage'
import Privacy from '../pages/privacy'
import Terms from '../pages/terms'
var BASEDIR = process.env.REACT_APP_BASEDIR;

var loginRoutes = [
    { path: BASEDIR+"/blog", name: "Blog", component: BlogDetail },
    { path: "/blog", name: "Blog", component: BlogDetail },
    { path: BASEDIR+"/blogs", name: "Blog", component: Blogs },
    { path: "/blogs", name: "Blogs", component: Blogs },
    { path: BASEDIR+"/privacy", name: "privacy", component: Privacy },
    { path: "/privacy", name: "privacy", component: Privacy },
    { path: BASEDIR+"/terms", name: "terms", component: Terms },
    { path: "/terms", name: "terms", component: Terms },
    { path: BASEDIR+"/market", name: "Market", component: MarketPlace },
    { path: "/market", name: "Market", component: MarketPlace },
    { path: BASEDIR+"/listings", name: "Listings", component: Listings },
    { path: "/listings", name: "Listings", component: Listings},
    { path: BASEDIR+"/discover", name: "Discover", component: Discovery },
    { path: "/discover", name: "Discover", component: Discovery},
    { path: BASEDIR+"/property", name: "property", component: Property },
    { path: "/property", name: "property", component: Property},
    { path: BASEDIR+"/404", name: "404", component: BlankPage },
    { path: "/404", name: "404", component: BlankPage },
    { path: BASEDIR+"/", name: "Home", component: Home },
    { path: "/", name: "Home", component: Home },
];


export default loginRoutes;
