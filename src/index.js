/* eslint-disable */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from "react-router-dom";
import {Switch, Route, Redirect} from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from './App';
import Login from "./scenes/login";
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();
const initGA = (history) => {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    },
    i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m
      .parentNode
      .insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  const ga = window.ga;
  ga('create', 'UA-125838003-1', 'auto');
  ga('send', 'pageview');
  // console.log("tracking page view: " + history.location.pathname);
  ga('send', 'pageview', history.location.pathname);
  history.listen((location) => {
    // console.log("tracking page view: " + location.pathname);
    ga('send', 'pageview', location.pathname);
  });
};

initGA(history);

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={() => { 
                return <Login/>;
            }}/>
            <Route 
                exact 
                path="/login" 
                render={props => {
                    return <Login {...props}/>
            }}/>
            <Route 
                exact 
                path="/chat" 
                render={() => {
                    return <App/>
            }}/>
        </Switch>
    </Router>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker();