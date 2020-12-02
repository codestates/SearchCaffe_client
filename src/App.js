import './App.css';
import Main from './pages/Main';
import Auth from '../src/components/Signin/auth';
import { fire } from './firebase/mainbase';
import Signin from './components/Signin/SignIn';
import Signup from './components/SignUp/SignUp';
function App() {
  console.log(fire);
  return (
    <div>
      <Main></Main>
    </div>
  );
}

export default App;
