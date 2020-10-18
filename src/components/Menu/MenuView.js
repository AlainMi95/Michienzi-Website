import React, { useState, useEffect } from 'react';
import styles from './MenuView.module.css'

export default function MenuView() {
  return (
    <div className={styles.menu}>
        <ul>
          <li>Lorem</li>
          <li>Ipsum</li>
          <li>Dolar</li>
        </ul>
    </div>
    );
}