import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      {/* <h1>hello rishav</h1> */}
      {/* <Login/> */}
      {/* <Register/> */}
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Register/>}></Route>
        <Route path='/user/:id' element={<UserProfile/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
