import React from 'react';
import { Route, Link } from 'react-router-dom';
import Main from './views/Main';
import Episodes from './views/Episodes';
import Details from './views/Details';


const App = () => (
  <div>
    <header>
      <Link to="/">Series</Link>
      <Link to="/details">Details</Link>
    </header>

    <main>
      <Route exact path="/" component={Main} />
      <Route exact path="/episodes" component={Episodes} />
      <Route exact path="/details" component={Details} />
    </main>
  </div>
);

export default App;
