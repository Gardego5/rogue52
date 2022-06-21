import React from 'react';
import { Display, Scheduler } from 'rot-js';

import tileSetImage from '../../media/1bit_2x.png';

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
  }
  
  attachDisplay() {
    const attachPoint = document.getElementById('game-display');

    attachPoint.appendChild(this.display.getContainer());
    this.display.draw(5, 5, 'w_N')
  }

  neighborHash(location) {
    const x = location[0];
    const y = location[1];
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
