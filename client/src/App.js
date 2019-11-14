import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./compnents/layout/Navbar";
import Landing from "./compnents/layout/Landing";
import Login from "./compnents/auth/Login";
import Register from "./compnents/auth/Register";
import Alert from "./compnents/layout/Alert";
import Dashboard from "./compnents/dashboard/Dashboard";
import CreateProfile from "./compnents/profile-forms/CreateProfile";
import EditProfile from "./compnents/profile-forms/EditProfile";
import AddExperience from "./compnents/profile-forms/AddExperience";
import AddEducation from "./compnents/profile-forms/AddEducation";
import Profiles from "./compnents/profiles/Profiles";
import Profile from "./compnents/profile/Profile";
import Posts from "./compnents/posts/Posts";
import PrivateRoute from "./compnents/routing/PrivateRoute";
// Redux
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/auth";

import "./App.css";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:id' component={Profile} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute
              exact
              path='/add-experience'
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path='/add-education'
              component={AddEducation}
            />
            <PrivateRoute exact path='/posts' component={Posts} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
