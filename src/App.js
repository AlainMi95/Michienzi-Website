import React from 'react';
import styles from './App.css';
import ImageView from './components/ImageView/ImageView'
import MenuView from './components/Menu/MenuView'
import homeImg from './components/Menu/007-house.png';
import aboutImg from './components/Menu/004-assistance.png';
import cvImg from './components/Menu/018-map.png';
import contactImg from './components/Menu/030-telephone.png';

function App() {
  return (
    <div class="rootDiv">
        <nav>
           <a href="#home"><img  class='homeImage' src={homeImg}/><i class="far fa-user"></i></a>
           <a href="#about"><img  class='aboutImage' src={aboutImg}/><i class="fas fa-briefcase"></i></a>
           <a href="#cv"><img  class='cvImage' src={cvImg}/><i class="far fa-file"></i></a>
           <a href="#contact"><img  class='contactImage' src={contactImg}/><i class="far fa-address-card"></i></a>
        </nav>

        <div>
            <ImageView />
        </div>

        <div class= 'container'>
          <section id= 'home'>
            <h1>home</h1>
          </section>

          <section id= 'about'>
            <h1>about</h1>
          </section>

         <section id= 'cv'>
           <h1>cv</h1>
          </section>

         <section id= 'contact'>
           <h1>contact</h1>
          </section>
        </div>
    </div>
  );
}

export default App;