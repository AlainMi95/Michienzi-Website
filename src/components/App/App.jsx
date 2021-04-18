import React from 'react';

import style from './App.module.css'

import Grid from "../Grid/Grid";
import ImageView from "../ImageView/ImageView";
import Footer from "../Footer/Footer";

export default function App() {
  return (
      <div className={style.mainDiv}>
          <div>
              <ImageView/>
              <Grid/>
              <Footer/>
          </div>
      </div>
  );
}