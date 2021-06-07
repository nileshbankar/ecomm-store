import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  Home,
  About,
  Cart,
  Checkout,
  Error,
  PrivateRoute,
  Product,
  SingleProduct,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/about">
            <About></About>
          </Route>
          <Route exact path="/cart">
            <Cart></Cart>
          </Route>
          <Route exact path="/products">
            <Product></Product>
          </Route>
          <Route
            exact
            path="/products/:id"
            children={<SingleProduct></SingleProduct>}
          ></Route>
          <PrivateRoute exact path="/checkout">
            <Checkout></Checkout>
          </PrivateRoute>
          <Route exact path="*">
            <Error></Error>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </AuthWrapper>
  );
}

export default App;
