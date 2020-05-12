import React from 'react';
import logo from './logo.svg';
import './App.css';
import ExamplePage from './ExamplePage'
import ProxyPage from './Pages/ProxyPage'
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <HashRouter basename="/">
    <div className="App">
      <Switch>
        <Route path = "/proxy">
      <ProxyPage/>
      </Route>
      <Route path = "/">
      <ExamplePage> </ExamplePage>
      </Route>
      </Switch>
    </div>
    </HashRouter>
  );
}

export default App;
