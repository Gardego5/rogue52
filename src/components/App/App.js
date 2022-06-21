import React from 'react';

import './App.css';

import Game from '../Game/Game';

export default class App extends React.Component {
  render() {
    return (
      <div className='flex-column'>
        <h1>Rogue <i>52</i></h1>
        <Game />
      </div>
    );
  }
}
