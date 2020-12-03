import './App.css';
import { Main, Content } from './pages';
//import Auth from '../src/components/Signin/auth';
import { fire } from './firebase/mainbase';
//import Signin from './components/Signin/SignIn';
//import Signup from './components/SignUp/SignUp';
import { Route, BrowserRouter } from 'react-router-dom'


function App() {
  console.log(fire);
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Main} />
        <Route exact path="/content" component={Content} />
      </div>
    </BrowserRouter>
  );
}

export default App;
