import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';

import Header from './Components/Header/Header';
import Spinner from "./Components/Spinner/Spinner";
import { selectCurrentUser, checkUserSession } from './redux/UserReducer/userReducer';
import { selectCollectionsForPreview } from "./redux/ShopReducer/shopReducer";

const HomePage = lazy(() => import('./Pages/HomePage/HomePage'))
const ShopPage = lazy(() => import('./Pages/Shop/ShopPage'))
const Checkout = lazy(() => import('./Pages/Checkout/Checkout'))
const SignInAndSignUp = lazy(() => import('./Components/SignInAndSignUp/SignInAndSignUp'))

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

    return (
      <div>
        <Header/>
        <Switch>
          <Suspense fallback={<Spinner/>}>
            <Route exact path='/' component={HomePage}/>
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={Checkout} />
            <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUp/>)} />
          </Suspense>
        </Switch>
      </div>
    );
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
