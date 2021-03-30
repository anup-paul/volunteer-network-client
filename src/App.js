import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Event from './Components/Events/Event';
import Blog from './Components/Blog/Blog';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();


function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div className="App">
      <h1>Hello DUDE!</h1>
      <h2>Email:{loggedInUser.email}</h2>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header></Header>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/events">
            <Event></Event>
          </PrivateRoute>
          <Route path="/blog">
            <Blog></Blog>
          </Route>
          <PrivateRoute path="/register">
            <Register></Register>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>

        </Router>
      </UserContext.Provider>

    </div>
  );
}

export default App;
