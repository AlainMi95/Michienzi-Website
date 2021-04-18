import React from 'react';

import style from './App.module.css'

import Header from "../Header/Header";
import Grid from "../Grid/Grid";
import ImageView from "../ImageView/ImageView";
import Footer from "../Footer/Footer";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Code from "../Code/Code";


export default function App() {
  return (
      <Router>
          <div className={style.mainDiv}>
              <div>
                  <Header/>
                  <Switch>
                      <Route path="/">
                          <ImageView/>
                          <Grid/>
                      </Route>
                      <Route path="/code">
                        <Code/>
                      </Route>
                  </Switch>
                  <Footer/>
              </div>
          </div>
      </Router>
  );
}