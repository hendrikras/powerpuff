import React from 'react';
import { Route } from 'react-router-dom';
import Main from './components/containers/Main';
import Details from './components/containers/Details';
import { LinkElement } from './components/styled';

const App = () => (
  <div>
    <header>
      <LinkElement to="/">Home</LinkElement>
    </header>

    <main>
      <Route exact path="/" component={Main} />
      <Route path="/details/:id" component={Details} />
    </main>
  </div>
);

export default App;
