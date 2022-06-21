import React from 'react';
import { Display, Scheduler } from 'rot-js';

import tileSetImage from '../../media/1bit_2x.png';

class Game {
  display = null;
  engine = null;
  map = {};
  options = {
    layout: 'tile',
    bg: "#472d3c",
    tileWidth: 32,
    tileHeight: 32,
    tileSet: Object.assign(document.createElement('img'), { src: tileSetImage }),
    _tileMap: {
        "@": [25, 0],
        ".": [4, 0],
        "P": [27, 0],
        "*": [8, 6],
    },
    get tileMap() {
      let stretchedTileMap = {};

      Object.keys(this._tileMap).forEach(key => {
        stretchedTileMap[key] = [
          this._tileMap[key][0] * this.tileWidth,
          this._tileMap[key][1] * this.tileHeight
        ];
      });

      return stretchedTileMap;
    },
    width: 30,
    height: 20,
  };

  constructor() {
    this.display = new Display(this.options);
  }
  
  attachDisplay() {
    const attachPoint = document.getElementById('game-display');

    attachPoint.appendChild(this.display.getContainer());
  }
}

export default class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: new Game,
    }
  }

  render() {
    return <div id='game-display'></div>;
  }

  componentDidMount() {
    this.state.game.attachDisplay();
  }

  componentDidUpdate() {
    this.state.game.attachDisplay();
  }
}
