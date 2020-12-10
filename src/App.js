import './App.css';
import Main from './pages/Main';
import Auth from '../src/components/Signin/auth';
import { fire } from './firebase/mainbase';
import SearchPlace from './SearchPlace';
import Cafe from './Cafe';
import getCurrentPosition from './getCurrentPosition';
import Map from './Map';
function App() {
  // getCurrentPosition();
  // const cafes = fakeData.map((cafe, i) => <Cafe place={cafe.address} key={i} />);
  getCurrentPosition();
  return (
    <div className="cafe">
      {/* {cafes} */}
      <Map
        cafeInfo={{
          cafeName: '커피베스코',
          cafeAddress: '서울 노원구 상계로 55 2층 (우)01694',
        }}
      />

      <div></div>
    </div>
  );
}

export default App;
