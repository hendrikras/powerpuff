import React from 'react';
import { Route } from 'react-router-dom';
import Main from './views/Main';
import Details from './views/Details';
import { LinkElement } from './styled';

const App = () => (
  <div>
    <header>
      <LinkElement to="/">Series</LinkElement>
    </header>

    <main>
      <Route exact path="/" component={Main} />
      <Route exact path="/details" component={Details} />
    </main>
  </div>
);

export default App;