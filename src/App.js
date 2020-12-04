import './App.css';
import Main from './pages/Main';
import Auth from '../src/components/Signin/auth';
import { fire } from './firebase/mainbase';
import SearchPlace from './SearchPlace';
import Cafe from './Cafe';
import fakeData from './fakeData';
import getCurrentPosition from './getCurrentPosition';
function App() {
  getCurrentPosition();
  const cafes = fakeData.map((cafe, i) => <Cafe place={cafe.address} key={i} />);

  return (
    <div className="cafe">
      {cafes}
      <div></div>
    </div>
  );
}

export default App;
