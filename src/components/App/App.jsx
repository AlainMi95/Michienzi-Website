import React from 'react';

import style from './App.module.css'

import Grid from "../Grid/Grid";
import ImageView from "../ImageView/ImageView";

export default function App() {
  return (
      <div className={style.mainDiv}>
          <div>
              <ImageView/>
              <Grid/>
          </div>
      </div>
  );
}