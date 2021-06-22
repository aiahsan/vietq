import React,{useEffect} from 'react';
import { createBrowserHistory } from 'history';
import indexRoutes from '../../routes/index';
import loginRoutes from '../../routes/loginRoutes';
import {useDispatch,useSelector} from 'react-redux';
import {setLocation} from '../../redux/actionMethodes/User/index';

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  const hist = createBrowserHistory();

const MainApp= ()=>{
    const dispatch=useDispatch();
    const user=useSelector(x=>x.User)
    const  getCurrentPosition = () => {
      
        const geolocation = navigator.geolocation;
        geolocation.getCurrentPosition(
          position => {
            console.log(position,"pooo");
            dispatch(setLocation(position.coords))
          },
          () => {
            console.log(new Error("Permission denied"));
          }
        );
      };   
    useEffect(()=>{
        getCurrentPosition()
    },[])

return   <Router history={hist} basename={process.env.REACT_APP_BASEDIR}>
    <Switch>
        {user!=null?loginRoutes.map((prop,key) => {
                //console.log(prop.path + prop.key);
                return ( 
                    <Route
                        path={prop.path}
                        key={key}
                        component={prop.component}
                    />
                );
            }):
            indexRoutes.map((prop,key) => {
                //console.log(prop.path + prop.key);
                return ( 
                    <Route
                        path={prop.path}
                        key={key}
                        component={prop.component}
                    />
                );
            })
        }
    </Switch>
</Router>

}
export default MainApp;