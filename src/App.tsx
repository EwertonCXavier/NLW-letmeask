import React from 'react';
import {Button} from './Components/Button'
import {Home} from './Pages/Home';
import {NewRoom} from './Pages/NewRoom';

import {Route, BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" component={NewRoom} />

    </BrowserRouter>
  );
}

export default App;
