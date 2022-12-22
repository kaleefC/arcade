window.onload = function () {

  const gameState = {
    players: ['x', 'o'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  };

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
        'posx': [0, 1, 2],
        'posy': [0, 0, 0],
        'match': [
          {
            'xy': '00'
          },
          {
            'xy': '10'
          },
          {
            'xy': '20'
          }
        ]
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
        'posx': [0, 1, 2],
        'posy': [0, 1, 2],
        'match': [
          {
            'xy': '00'
          },
          {
            'xy': '11'
          },
          {
            'xy': '22'
          }
        ]
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
        'posx': [0, 0, 0],
        'posy': [0, 1, 2],
        'match': [
          {
            'xy': '00'
          },
          {
            'xy': '01'
          },
          {
            'xy': '02'
          }
        ]
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
        'posx': [1, 1, 1],
        'posy': [0, 1, 2],
        'match': [
          {
            'xy': '10'
          },
          {
            'xy': '11'
          },
          {
            'xy': '12'
          }
        ]
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
        'posx': [2, 2, 2],
        'posy': [0, 1, 2],
        'match': [
          {
            'xy': '20'
          },
          {
            'xy': '21'
          },
          {
            'xy': '22'
          }
        ]
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
        'posx': [0, 1, 2],
        'posy': [2, 2, 2],
        'match': [
          {
            'xy': '02'
          },
          {
            'xy': '12'
          },
          {
            'xy': '22'
          }
        ]
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
        'posx': [0, 1, 2],
        'posy': [1, 1, 1],
        'match': [
          {
            'xy': '01'
          },
          {
            'xy': '11'
          },
          {
            'xy': '21'
          }
        ]
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
        'posx': [0, 1, 2],
        'posy': [2, 1, 0],
        'match': [
          {
            'xy': '02'
          },
          {
            'xy': '11'
          },
          {
            'xy': '20'
          }
        ]
      }
    ]

  };

  let boxes = document.getElementsByClassName("float-child");
  let resetBTN = document.getElementById('Reset');
  let userBTN = document.getElementById('submitButton');
  let newGame = gameState;
  let playerX = {};
  let playerO = {};

  playerX['posx'] = [];
  playerX['posy'] = [];

  playerO['posx'] = [];
  playerO['posy'] = [];

  resetBTN.addEventListener('click', reset);
  userBTN.addEventListener('click', nameSubmit);

  for (let c in boxes) {

    if (typeof boxes[c] == 'object') {

      boxes[c].addEventListener('click', turnClick);
    }
  }

  function nameSubmit() {

    let fnam = document.getElementById("fnam").value;
    let lnam = document.getElementById('lnam').value;

    if (fnam.length == 0 || lnam.length == 0) {

      alert('Players one and two need a name to continue.');

    } else {

      document.getElementById("Board").setAttribute('style', "");

      let htmlBody = `
        <p> x = ${fnam}
          <br> 
          o = ${lnam}
        </p>
      `;

      document.getElementById('fnam').setAttribute('player', fnam);
      document.getElementById('lnam').setAttribute('player', lnam);
      document.getElementById('root').innerHTML = htmlBody;
    }
  }

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

      document.getElementById('winCheck').innerText = "";
      document.getElementById("root").innerText = "Who is playing?";
      document.getElementById('fnam').value = "";
      document.getElementById('fnam').removeAttribute('player');
      document.getElementById('lnam').value = "";
      document.getElementById('lnam').removeAttribute('player');
      document.getElementById('Board').setAttribute('turn', "X");
      document.getElementById('Board').setAttribute('style', 'display:none');
      document.getElementById('Board').setAttribute('winner', 'false');

      playerX = {};
      playerO = {};

      playerX['posx'] = [];
      playerX['posy'] = [];

      playerO['posx'] = [];
      playerO['posy'] = [];
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
    let isWinner = document.getElementById("Board").getAttribute("winner");

    if (turn == "X") {

      taken = gameboard(player, posx, posy);

      if (isWinner == 'false' && taken == false) {

        let currentTurn = "X";

        board.setAttribute("turn", "O");
        turn = document.getElementById('Board').getAttribute('turn');
        document.getElementById(id).innerHTML = document.getElementById('X').outerHTML;

        playerX['posx'].push(parseInt(posx));
        playerX['posy'].push(parseInt(posy));

        for (let w in winning['winners']) {

          let matchZero = parseInt('0');

          for (let p in playerX['posx']) {

            let xy = `${playerX['posx'][p]}${playerX['posy'][p]}`;

            for (let m in winning['winners'][w]['match']) {

              let eachMatch = winning['winners'][w]['match'][m]['xy'];

              if (xy == eachMatch) {

                matchZero++;

              }
            }

            if (matchZero == 3) {

              let attrPlayer = document.getElementById('fnam').getAttribute('player');

              console.log('Winner Winner Chicken Dinner!');
              document.getElementById('winCheck').innerText = `Winner Winner Check Dinner! Winner is player: ${attrPlayer} ${currentTurn}`;
              document.getElementById('Board').setAttribute("winner", true);
            }
          }
        }
      }

    } else {

      taken = gameboard(player, posx, posy);

      if (isWinner == 'false' && taken == false) {

        let currentTurn = 'O';

        board.setAttribute("turn", "X");
        turn = document.getElementById('Board').getAttribute('turn');
        document.getElementById(id).innerHTML = document.getElementById('O').outerHTML;

        playerO['posx'].push(parseInt(posx));
        playerO['posy'].push(parseInt(posy));

        for (let w in winning['winners']) {

          let matchZero = parseInt('0');

          for (let p in playerO['posx']) {

            let xy = `${playerO['posx'][p]}${playerO['posy'][p]}`;

            for (let m in winning['winners'][w]['match']) {

              let eachMatch = winning['winners'][w]['match'][m]['xy'];

              if (xy == eachMatch) {

                matchZero++;
              }
            }

            if (matchZero == 3) {

              let attrPlayer = document.getElementById('lnam').getAttribute('player');

              console.log('Winner Winner Chicken Dinner!');
              document.getElementById('winCheck').innerText = `Winner Winner Check Dinner! Winner is player: ${attrPlayer} ${currentTurn}`;
              document.getElementById('Board').setAttribute("winner", true);
            }
          }
        }
      }
    }
  }

  function gameboard(str, posx, posy) {

    let taken;

    if (newGame['board'][posx][posy] == null) {

      newGame['board'][posx][posy] = str;

      taken = false;

    } else {

      taken = true;
    }

    return taken;
  }

}