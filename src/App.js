import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';

import HomePage from "./Pages/HomePage/HomePage";

function App() {
  return (
    <div>
        <Switch>
           <Route exact path='/' component={HomePage}/>
           <Route/>
        </Switch>
    </div>
  );
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

export default App;
