import './App.css';
import Main from './pages/Main';
import Auth from '../src/components/Signin/auth';
import { dbService } from './firebase/mainbase';
import SearchPlace from './SearchPlace';
import Cafe from './Cafe';
import getCurrentPosition from './getCurrentPosition';
import Map from './Map';
import { useEffect, useState } from 'react';
function App() {
  getCurrentPosition();
  // const cafes = fakeData.map((cafe, i) => <Cafe place={cafe.address} key={i} />);
  // const [cafes, setCafe] = useState([]);
  // const getCafeInfo = async () => {
  //   let cafe = await dbService.collection('test').get();
  //   cafe.forEach((doc) => {
  //     return doc.data();
  //   });
  //   setCafe(cafe);
  // };
  // useEffect(() => {
  //   dbService.collection('test').onSnapshot((snapshot) => {
  //     const cafeInfo = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setCafe(cafeInfo);
  //   });
  // }, []);
  // getCurrentPosition();
  return (
    <div>
      {
        // <SearchPlace />
        // <Map
        //   cafeInfo={{
        //     cafeName: '커피 베스코',
        //     cafeAddress: '서울 노원구 상계로 55 2층 (우)01694',
        //   }}
        // />
      }
    </div>
  );
}

export default App;
