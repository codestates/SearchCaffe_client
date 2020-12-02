import './App.css';
import Main from './pages/Main';
import Auth from '../src/components/Signin/auth';
import { fire } from './firebase/mainbase';
import Signin from './components/Signin/SignIn';

function App() {
  console.log(fire);
  return (
    <div>
      <div>
        <Main></Main>
        {/* <Auth />
        <Signin show={true} /> */}
      </div>
    </div>
  );
}

export default App;
