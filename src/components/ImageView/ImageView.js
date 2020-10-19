import React, { useState, useEffect } from 'react';
import logo from './image002.jpg';
import styles from './ImageView.module.css'

export default function ImageView() {
  return <img className={styles.img} src={logo} alt="Logo" />;
}