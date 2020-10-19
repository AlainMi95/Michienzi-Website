import React from 'react';
import styles from './App.css';
import ImageView from './components/ImageView/ImageView'
import MenuView from './components/Menu/MenuView'

function App() {
  return (
    <div class="rootDiv">
        <nav>
           <a href="#home"><img  src='./components/Menu/007-house.png'/><i class="far fa-user"></i></a>
           <a href="#about"><img  src='./components/Menu/004-assistance.png'/><i class="fas fa-briefcase"></i></a>
           <a href="#cv"><img  src='./components/Menu/018-map.png'/><i class="far fa-file"></i></a>
           <a href="#contact"><img  src='./components/Menu/030-telephone.png'/><i class="far fa-address-card"></i></a>
        </nav>

        <div>
            <ImageView />
        </div>

        <div class= 'container'>
          <section id= 'home'>
            <img  src='./components/Menu/007-house.png'/>
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