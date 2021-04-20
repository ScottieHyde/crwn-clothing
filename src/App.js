import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';

import HomePage from "./Pages/HomePage/HomePage";
import ShopPage from "./Pages/Shop/Shop";
import Header from './Components/Header/Header';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/UserReducer/userReducer';
import SignInAndSignUp from './Components/SignInAndSignUp/SignInAndSignUp';
import { selectCurrentUser } from './redux/UserReducer/userReducer';

class App extends React.Component {

  // this is needed so when the component unmounts we remove the open auth connection below to prevent memory leaks
  unsubscribeFromAuth = null;

  componentDidMount() {
    // this is a method on the auth library
    // takes a function and a user as a parameter
    // this gives us the user state on our project in firebase
    // this also helps with persistence so if the user closes the window or refreshes the page, they will be signed in still if signed in before

    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id, // the id is not store in the data, it's stord on the snapShot object itself
              ...snapShot.data(), // we have to call .data() here to get the user data like createdAt displayName, email
            });
          });
      }
      setCurrentUser(userAuth); // this will be null if the userAuth doesn't exist
    }); 
  }

  componentWillUnmount() {
    // when we call this the auth connection closes
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
          <Switch>
             <Route exact path='/' component={HomePage}/>
             <Route path='/shop' component={ShopPage} />
             <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUp/>)} />
          </Switch>
      </div>
    );
  }
  
}


// exact matches the exact url
// path is the path of the URL in the address bar
// Component is the component we want to show
// each of these components receive props from ROUTE that we can use
// Link is a link that changes the url to the "to" path we specify
// another way to navigate to another url is using the history prop
// see the button example below
// the location prop tells us the full path name we are at in the URL address
// function AppTwo() {
//     return (
//         <div>
//             <Link to='/topics' ></Link>
//             <button onClick={() => props.history.push('./topics')} ></button>
//             <Route exact path='/' component={HomePage} />
//             <Route exact path='/topics' component={TopicsList}/>
//             <Route path='/topics/:topicId' component={TopicDetail} />
//         </div>
//     )
// }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
