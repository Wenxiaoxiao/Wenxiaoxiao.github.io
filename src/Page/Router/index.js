import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Main from '../Main';
import NoMatch from '../../Page/NoMatch';


class PmpRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <Router >
      <div>
      <Switch> 
      <Route path="/" component={Main} />
      <Route path="/Main" component={Main} />
      <Route component={NoMatch}/>
     </Switch>
     </div>
     </Router>
    );
  }
}

export default PmpRouter;
