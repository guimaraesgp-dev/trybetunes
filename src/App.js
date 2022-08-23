import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import album from './pages/album';
import login from './pages/login';
import search from './pages/search';
import favorites from './pages/favorites';
import profile from './pages/profile';
import editprofile from './pages/editprofile';
import notfound from './pages/notfound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ login } />
          <Route path="/search" component={ search } />
          <Route path="/album/:id" component={ album } />
          <Route path="/favorites" component={ favorites } />
          <Route path="/profile/edit" component={ editprofile } />
          <Route path="/profile" component={ profile } />
          <Route component={ notfound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
