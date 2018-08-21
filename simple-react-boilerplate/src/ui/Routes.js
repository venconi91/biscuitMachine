import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import BiscuitMachine from './pages/BiscuitMachine';
import PageNotFound from './pages/PageNotFound';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={BiscuitMachine} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
