import React from 'react';
import styles from './App.css';
import ImageView from './components/ImageView/ImageView'
import MenuView from './components/Menu/MenuView'

function App() {
  return (
    <div class="rootDiv">
        <nav>
           <a href="#first">1<i class="far fa-user"></i></a>
           <a href="#second">2<i class="fas fa-briefcase"></i></a>
           <a href="#third">3<i class="far fa-file"></i></a>
           <a href="#fourth">4<i class="far fa-address-card"></i></a>
        </nav>

        <div class= 'container'>
          <section id= 'first'>
            <h1>First</h1>
          </section>

          <section id= 'second'>
            <h1>Second</h1>
          </section>

         <section id= 'third'>
           <h1>Third</h1>
          </section>

         <section id= 'fourth'>
           <h1>Fourth</h1>
          </section>
        </div>
    </div>
  );
}

export default App;