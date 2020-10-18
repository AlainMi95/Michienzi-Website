import React from 'react';
import styles from './App.css';
import ImageView from './components/ImageView/ImageView'
import MenuView from './components/Menu/MenuView'

function App() {
  return (
    <div className={styles.rootDiv}>
          <div className={styles.imgDiv}>
            <MenuView />
          </div>
          <div className={styles.menuDiv}>
            <ImageView />
          </div>
          <div className={styles.slideDiv}>
            <p>slide</p>
          </div>
    </div>
  );
}

export default App;