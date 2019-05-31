import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Provider } from 'mobx-react'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import Login from './Login'
import { HomeComponent } from './Home'
import './App.css';

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
          <Provider>
              <BrowserRouter>
                  <Switch>
                      <Route path="/login" component={Login} />
                      <Route path="/home" component={HomeComponent} />
                      <Route
                          path="/"
                          render={() => <Redirect to="/login" />}
                      />
                  </Switch>
              </BrowserRouter>
          </Provider>
      </LocaleProvider>
    );
  }
}

export default App;
