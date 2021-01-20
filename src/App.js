import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Error from './pages/Error';
import SingleDrink from './pages/SingleDrink';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/drink/:id" component={SingleDrink}></Route>
        {/* <Route path="/register" component={SingleDrink}></Route>
        <Route path="/signin" component={SingleDrink}></Route> */}
        <Route path="*" component={Error}></Route>
      </Switch>
    </Router>
  );
}

export default App;
