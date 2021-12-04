import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/productDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import Book from './components/Book/Book';
// import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Inventory from './components/Inventory/Inventory';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const  UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    userEmail : '',
    displayName : ''
  });

  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h2>Login: {loggedInUser.userEmail}</h2>
     
      <Router>
        <Header></Header>
        <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
           
            <Route path="/book">
               <Book />
            </Route>
            <Route path="/inventory">
               <Inventory />
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment />
            </PrivateRoute>
            
            <Route path="/login">
                <Login></Login>
            </Route>
            <Route exact path="/">
                <Shop></Shop>
            </Route>
            <Route path="/product/:productKey">
                <ProductDetail></ProductDetail>
            </Route>
            <Route path="*">
                <NotFound></NotFound>
            </Route>
        </Switch>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
