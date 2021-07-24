import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AllCourses from './views/AllCourses';
import EnrolledCourses from './views/EnrolledCourses';
import MenuBar from "./components/MenuBar";
// import LoginDialog from "./components/dialogs/LoginDialog";


export default function App() {
  return (
    <Router>
      <div>
        <MenuBar />
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}

        <Switch>
          <Route exact path="/">
            <AllCourses />
          </Route>
          <Route path="/enrolled_courses">
            <EnrolledCourses />
          </Route>
          {/* <Route path="/login">
            <LoginDialog /> 
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}