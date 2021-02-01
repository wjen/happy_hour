import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Error from './pages/Error';
import Register from './pages/Register';
import Login from './pages/Login';
import SingleDrink from './pages/SingleDrink';
import Profile from './pages/Profile';
import Users from './pages/Users';
import { AuthRoute, PrivateRoutes } from './util/AuthRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/drink/:id" component={SingleDrink}></Route>

        {/* Auth Route redirects logged in users back to home */}
        <AuthRoute path="/register" component={Register} />
        <AuthRoute path="/login" component={Login} />

        <PrivateRoutes path="/profile" component={Profile} />
        <Route path="/admin/users" component={Users}></Route>
        <Route path="*" component={Error}></Route>
      </Switch>
    </Router>
  );
}

export default App;
