import React from "react";

import { Route, Switch } from 'react-router-dom';
import HomePage from "./Components/HomePage/HomePage";
import MeetandGreet from "./Components/BookingPage/MeetandGreet";

const App = () => {

  return (

    <Switch>  
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/BookingPage" component={MeetandGreet} />
    </Switch>
  )
}
export default App;