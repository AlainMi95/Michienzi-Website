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

import { BrowserRouter, Route, Switch} from 'react-router-dom';

export default function App() {
  return (
      <BrowserRouter>
          <div className={style.mainDiv}>
              <div>
                  <Header/>
                  <Switch>
                      <Route exact path="/">
                          <div className={style.gridDiv}>
                            <ImageView/>
                            <Grid/>
                          </div>
                      </Route>
                      <Route path='/about' component={About}/>
                      <Route path='/code' component={Code}/>
                      <Route path='/contact' component={Contact}/>
                      <Route path='/blog' component={Blog}/>
                  </Switch>
                  <Footer/>
              </div>
          </div>
      </BrowserRouter>
  );
}