import React from 'react';
import { Route, Link } from 'react-router-dom';
import Main from './views/Main';
import Episodes from './views/Episodes';


const App = () => (
  <div>
    <header>
      <Link to="/">Series</Link>
    </header>

    <main>
      <Route exact path="/" component={Main} />
      <Route exact path="/episodes" component={Episodes} />
    </main>
  </div>
);

export default App;
