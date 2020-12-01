import './App.css';
import Auth from '../src/components/Signin/auth';
import { fire } from './firebase/mainbase';
import Signin from './components/Signin/SignIn';

function App() {
  console.log(fire);
  return (
    <div>
      <Auth />
      <Signin show={true} />
    </div>
  );
}

export default App;
