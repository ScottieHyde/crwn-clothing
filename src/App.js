import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';

import HomePage from "./Pages/HomePage/HomePage";
import ShopPage from "./Pages/Shop/Shop";
import Checkout from "./Pages/Checkout/Checkout";
import Header from './Components/Header/Header';
import SignInAndSignUp from './Components/SignInAndSignUp/SignInAndSignUp';
import { selectCurrentUser, checkUserSession } from './redux/UserReducer/userReducer';
import { selectCollectionsForPreview } from "./redux/ShopReducer/shopReducer";

class App extends React.Component {

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession()
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUp/>)} />
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
