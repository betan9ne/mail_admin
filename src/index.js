
import React,{ useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin/Admin.js";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import {store} from './redux/store'
import {Provider} from 'react-redux'
import Login from "views/Login";
import TableList from "views/TableList"


ReactDOM.render(
  <Provider store={store}>
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
      <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/login" component={Login}/>
          <Route path="/demo" component={TableList}/>
          <Redirect from="/" to="/admin/dashboard" />
        </Switch> 
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
  </Provider>,
  document.getElementById("root")
);
