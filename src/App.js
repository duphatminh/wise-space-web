import React from 'react';
import './App.scss';

import Appbar from 'components/AppBar/AppBar';
import BoardBar from 'components/BoardBar/BoardBar';
import BoardContent from 'components/BoardContent/BoardContent';


function App() {
  return (
    <div className="wise-space-master">
      <Appbar/>
      <BoardBar/>
      <BoardContent/>
      
    </div>
  );
}

export default App;
