import React from 'react';
import { Display, Map } from 'rot-js';

import tileSetImage from '../../media/1bit_2x.png';
import { keyToCoords } from '../../utils/MapUtils';

class Game {
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
      "w_N": [19, 2],
      "w_NE": [19, 3],
      "w_E": [18, 1],
      "w_SE": [19, 4],
      "w_S": [19, 0],
      "w_SW": [18, 4],
      "w_W": [20, 1],
      "w_NW": [18, 3],
      "c_NE": [18, 2],
      "c_SE": [18, 0],
      "c_SW": [20, 0],
      "c_NW": [20, 2],
      "w_X": [0, 13],
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
  display = null;
  engine = null;
  map = {};

  constructor() {
    this.display = new Display(this.options);

    this.attachDisplay = this.attachDisplay.bind(this);
    this._generateMap = this._generateMap.bind(this);
    this._drawWholeMap = this._drawWholeMap.bind(this);

    this._generateMap();
  }
  
  attachDisplay() {
    const attachPoint = document.getElementById('game-display');
    attachPoint.appendChild(this.display.getContainer());
    setTimeout(this._drawWholeMap, 10);
  }

  neighborHash(location) {
    let {x, y} = keyToCoords(location);
    let hash = 0;
    const places = [
      [x - 1, y - 1], [x    , y - 1], [x + 1, y - 1],
      [x - 1, y    ], [x    , y    ], [x + 1, y    ],
      [x - 1, y + 1], [x    , y + 1], [x + 1, y + 1],
    ]

    for (let placeIndex in places) {
      const digit = Math.pow(2, placeIndex) * (this.map[places[placeIndex]] === "floor");
      hash += digit;
    }

    return hash;
  }

  _generateMap() {
    let digger = new Map.Digger(this.options.width, this.options.height);
    let freeCells = [];

    let digCallback = function(x, y, value) {
      if (value) return;

      let key = x+','+y;
      this.map[key] = '.';
      freeCells.push(key);
    }

    digger.create(digCallback.bind(this));
  }

  _drawWholeMap() {
    for (let key in this.map) {
      let {x, y} = keyToCoords(key);
      this.display.draw(x, y, this.map[key]);
    }
  }
}

export default class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: new Game(),
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
