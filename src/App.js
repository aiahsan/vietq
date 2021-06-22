import './App.css';
import './styles/hamza.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";


import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store,perssistor} from './redux/store'
import Main from './components/home/mainApp'
function App() {
    // const innerRef = useRef(); 
 
    return (
    <Provider store={ store}>
    <PersistGate persistor={perssistor}>
    <div className="App">
    {/* <Location onError={(error) => console.log(error)} ref={innerRef} /> */}
        <Main/>
   </div>
   
    </PersistGate>
    </Provider>   );
}

export default App;
