import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import EventCalendar from './EventCalendar';
import Home from './Home';

const RoutesPages=()=>{
    return(
        <Router>
      <Routes>
      <Route path='/' element={<Home/>}>
        </Route>
        <Route path='/events' element={<EventCalendar/>}>
        </Route>
      </Routes>
      
      </Router>
    )
}
export default RoutesPages;