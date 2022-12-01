window.onload = function () {

  const gameState = {
    players: ['x', 'o'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }

  let boxes = document.getElementsByClassName("float-child");
  let resetBTN = document.getElementById('Reset')

  let winning = {
    winners: [
      {
        'player': 'XO',
        'winner': [
          [
            ['x', null, null],
            ['x', null, null],
            ['x', null, null]
          ]
        ],
        'posx': [0,1,2],
        'posy': [0,0,0]
      },
      {
        'player': 'XO',
        'winner': [
          [
            ['x', null, null],
            [null, 'x', null],
            [null, null, 'x']
          ]
        ],
        'posx': [0,1,2],
        'posy': [0,1,2]
      },
      {
        'player': 'XO',
        'winner': [
          [
            ['x', 'x', 'x'],
            [null, null, null],
            [null, null, null]
          ]
        ],
        'posx': [0,0,0],
        'posy': [0,1,2]
      },
      {
        'player': 'XO',
        'winner': [
          [
            [null, null, null],
            ['x', 'x', 'x'],
            [null, null, null]
          ]
        ],
        'posx': [1,1,1],
        'posy': [0,1,2]
      },
      {
        'player': 'XO',
        'winner': [
          [
            [null, null, null],
            [null, null, null],
            ['x', 'x', 'x']
          ]
        ],
        'posx': [2,2,2],
        'posy': [0,1,2]
      },
      {
        'player': 'XO',
        'winner': [
          [
            [null, null, 'x'],
            [null, null, 'x'],
            [null, null, 'x']
          ]
        ],
        'posx': [2,2,2],
        'posy': [0,1,2]
      },
      {
        'player': 'XO',
        'winner': [
          [
            [null, 'x', null],
            [null, 'x', null],
            [null, 'x', null]
          ]
        ],
        'posx': [1,1,1],
        'posy': [0,1,2]
      },
      {
        'player': 'XO',
        'winner': [
          [
            [null, null, 'x']
            [null, 'x', null],
            ['x', null, null]
          ]
        ],
        'posx': [2,1,0],
        'posy': [0,1,2]
      }
    ]

  };

  let playerX = {};
  let playerO = {};

  playerX['posx'] = [];
  playerX['posy'] = [];

  playerO['posx'] = [];
  playerO['posy'] = [];

  
  for (let c in boxes) {

    console.log(typeof boxes[c])
    if (typeof boxes[c] == 'object') {

      boxes[c].addEventListener('click', turnClick);
    }
  }

  resetBTN.addEventListener('click', reset);

  function reset() {

    for (let c in boxes) {

      if (typeof boxes[c] == 'object') {

        boxes[c].innerHTML = "";

        for (let g in newGame['board']) {

          for (let n in newGame['board'][g]) {

            newGame['board'][g][n] = null;
          }
          

        }
      }

      document.getElementById('Board').setAttribute('turn', "X")
    }


  }
  function turnClick() {

    let turn = document.getElementById('Board').getAttribute('turn');
    let board = document.getElementById('Board');
    let id = this.id;
    let taken;
    let player = turn.toLowerCase();
    let posx = document.getElementById(id).getAttribute('posx');
    let posy = document.getElementById(id).getAttribute('posy');

    if (turn == "X") {

      taken = gameboard(player, posx, posy);

      if (taken == false) {

        board.setAttribute("turn", "O");
        turn = document.getElementById('Board').getAttribute('turn');
        document.getElementById(id).innerHTML = document.getElementById('X').outerHTML;


        playerX['posx'].push(parseInt(posx));
        playerX['posy'].push(parseInt(posy));

        for (let w in winning['winners']) {

          let wposx = winning['winners'][w]['posx'];
          let wposy = winning['winners'][w]['posy'];

          // use array.includes('', '', '')

          // if (playerX['posx'].length > 2) { //<-- working on correcting logic

          //   console.log(playerX['posx'].includes(wposx));
          //   console.log(playerX['posy'].includes(wposy));

          //    if (playerX['posx'].includes(wposx) && playerX['posy'].includes(wposy)) {

          //   console.log('You Win!!! Player X'); 
          // }
            

          // }



         
        }

      }

    }

    if (turn == "O") {

      taken = gameboard(player, posx, posy);

      if (taken == false) {

        board.setAttribute("turn", "X");
        turn = document.getElementById('Board').getAttribute('turn');
        document.getElementById(id).innerHTML = document.getElementById('O').outerHTML;

        playerO['posx'].push(parseInt(posx));
        playerO['posy'].push(parseInt(posy));

        for (let w in winning['winners']) {

          let wposx = winning['winners'][w]['posx'];
          let wposy = winning['winners'][w]['posy'];


          // if (playerO['posx'].includes(wposx) && playerO['posy'].includes(wposy)) { //<-- working on correcting logic

          //   console.log('You Win!!! Player O');
          // }
        }
        
      }
    }
    console.log(`new turn: ${turn}`);

    // console.log(newGame);
    // console.log('player X')
    // console.log(JSON.stringify(playerX, null, 2));
    // console.log('player O')
    // console.log(JSON.stringify(playerO, null, 2));

  }

  let newGame = gameState;

  function gameboard(str, posx, posy) {

    let taken;

    if (newGame['board'][posx][posy] == null) {

      newGame['board'][posx][posy] = str;

      taken = false;
    } else {

      console.log('taken');

      taken = true;

    }

    return taken;
  }

}