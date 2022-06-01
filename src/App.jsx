import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

// Import components
import Header from "./components/header/header";
import CartL from "./components/cart/cart";
import HomeView from "./components/homeView"
import LoginView from  "./components/login/loginView"
import Profile from "./components/profile/profile"
import ProfileForm from "./components/profile/profileForm";
import Payment from "./components/profile/payment";
import OrderPay from "./components/profile/orderPayement";
import  {ItemList} from "./components/item/listitem";
import Order from "./components/orders/orders";



// Import styles
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loggedIn: false,
    };
  }
  async componentDidMount() {}
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route exact path="/" element={<LoginView />} />
            <Route exact path="/home" element={<HomeView />} />
            <Route exact path="/login" element={<LoginView />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/profile_form" element={<ProfileForm />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/order_payment" element={<OrderPay />} />
            <Route exact path="/items" element={<ItemList />} />
            <Route exact path="/orders" element={<Order />} />
            <Route exact path="/cart" element={<CartL />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
