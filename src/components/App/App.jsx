import React from 'react';

import style from './App.module.css'

import Header from "../Header/Header";
import Grid from "../Grid/Grid";
import ImageView from "../ImageView/ImageView";
import Footer from "../Footer/Footer";
import Code from "../Code/Code";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Blog from "../Blog/Blog";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

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
                      <Route path='/about' exact component={About}/>
                      <Route path='/code' exact component={Code}/>
                      <Route path='/contact' exact component={Contact}/>
                      <Route path='/blog' exact component={Blog}/>
                  </Switch>
                  <Footer/>
              </div>
          </div>
      </Router>
  );
}