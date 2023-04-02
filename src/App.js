import './App.css';
import React, {Component} from "react";
import {About} from "./About";
import {Home} from "./Home";
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';

class App extends Component {

  render() {
    return (
        <div>
          <header>App</header>
          <menu>
              <Router>
                <ul>
                  <li><NavLink className="przycisk" activeClassName="active" to="/">Strona Główna</NavLink></li>
                  <li><NavLink className="przycisk" activeClassName="active" to="/about/authors">Informacje</NavLink></li>
                  <li><NavLink className="przycisk" activeClassName="active" to="/repos">Repozytorium</NavLink></li>
                  <li><NavLink className="przycisk" activeClassName="active" to="/about/info">Info</NavLink></li>
                  <li><NavLink className="przycisk" activeClassName="active" to="/inny">Inny</NavLink></li>
                </ul>
                  <Switch>
                      <Route path={["/about/(authors|info)", "/inny"]} render={ (routeProps) =>
                          <About wlasciwosc={"wartosc"} /> } />
                      <Route path="/repos" render={(routeProps) =>
                          <React.Fragment>
                              <h4 className="header">
                                  Fragment
                              </h4>
                          </React.Fragment>}/>
                      <Route component={Home}/>
                  </Switch>
              </Router>
          </menu>
        </div>
    )
  }
}

export default App;
