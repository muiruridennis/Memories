import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'


import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import useStyles from './styles';
import Auth from './components/Auth/Auth'



const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <Container maxWidth="lg">
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Auth" exact component={Auth}/>
        </Switch>
        
      </Container>
    </Router>
   );
};

        export default App;