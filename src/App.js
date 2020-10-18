import React from 'react';
import './App.css';
import Rick from './components/Rick/Rick'
import ReactPlayer from 'react-player'

function App() {
  return (
    <div>
      <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'/>
    </div>
  );
}

export default App;