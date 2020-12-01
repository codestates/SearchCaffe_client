import './App.css';
import Auth from '../src/components/Signin/auth';
import { fire } from './firebase/mainbase';

function App() {
  console.log(fire);
  return <Auth />;
}

export default App;
