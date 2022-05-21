import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Events from './Events';
import Home from './Home';
import UserProfile from "./UserProfile";

interface Props { };

const RoutesPages: React.FC<Props> = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}>
        </Route>
        <Route path='/dogadjaji' element={<Events />}>
        </Route>
        <Route path='/profil/:id' element={<UserProfile />}>
        </Route>
      </Routes>

    </Router>
  )
}
export default RoutesPages;