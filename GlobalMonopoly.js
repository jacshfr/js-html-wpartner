var totalspaces = 20;
var roll, winner;
var spaceLeft = true;
var player1_active = true;
var countries = [
  ["Test", 0, 0, "Arrays don't start at 1"],
  ["Korea (Buy one, get the other one.)", 100, 50, "Kim Jong Un insists he is a magician who can create money. Regardless, you earn $50."],
  ["Haiti", 10, -100, "The Dominican Republic opens their borders for all immigrants. The entire population of Haiti defects. The land is worthless. You lose $100."],
  ["Mexico", 30, 300, "With the legalization of marijuana in the United States, the peso appreciates 1000%. You earn $300."],
  ["Iraq", 50, -150, "Interesting choice. ISIS immediately takes over and you lose $150. Surprised? Don't be."],
  ["Kazakhstan", 75, -175, "Remember when Kazakhstan ruined the Aral Sea? The rest of the world does. Global warming happens, water prices rise, you lose $175. Go figure."],
  ["Ivory Coast", 100, 200, "Conflict diamonds become all the rage. You earn $200."],
  ["Ukraine", 150, -200, "The United States has given up on you and Russia has taken over. You lose your investment, and then some. -$200."],
  ["Dominican Republic", 100, 25, "The Dominican Republic opens its border to all immigrants. Production slightly increases. You earn $25."],
  ["Japan", 150, -100, "The working population of Japan retires, there is no workforce to take its place. You lose $100."],
  ["Australia", 250, -100, "Global warming causes temperatures to rise and kangaroos to go extinct. Tourists now have no reason to visit. You lose $100."],
  ["England", 200, -25, "A large group of reenactors visit London and reenact the Boston Tea Party at the Port of London. Tea prices rise and sales decrease. You lose $25."],
  ["Switzerland", 450, 200, "World War III begins. Switzerland remains neutral. You earn $200."],
  ["Russia", 250, 150, "Congratulations! Russia has successfully acquired Ukraine. You earn $150."],
  ["Guinea", 75, -150, "An ebola epidemic kills the entire population. You lose $150."],
  ["Canada", 400, 0, "Tourism in Canada increases 300%. However, the Prime Minister chooses to invest all profits into his maple-syrup expansion plan. You don't profit. Maybe next year!"],
  ["Netherlands", 275, -75, "The legalization of marijuana in the United States leads to a decline in tourism for the Netherlands. At least the prostitues are still world-class. You only lose $75."],
  ["United States", 500, -1000, "The newly elected United States President decides to pay back the national debt immediately. You lose $1000."],
  ["United Arab Emirates", 550, 125, "The UAE was rich before and it's still rich now. You earn $125."]
];

function Player(name) { //define player object
  this.name = name;
  this.money = 200;
  this.position = 0;
  this.turn = function() {
    if ((this.position + roll) > countries.length) {
      this.position = countries.length - 1;
    }
    else {
      this.position += roll;
    }
  };

  this.diceRoll = function() { //activates number roll, creates question, turns yes and no buttons on.
    roll = Math.floor((Math.random() * 4) + 1);
    this.turn();
    document.getElementById("roll").innerHTML = this.name + " rolled a " + roll + "!";
    document.getElementById("event").innerHTML = "Would " + this.name + " like to purchase " + countries[this.position][0] + " for $" + countries[this.position][1] + "?";
    document.getElementById(this.name).innerHTML = this.name + " $" + this.money;
    rollButton.off();
    yesButton.on();
    noButton.on();
  };

  this.triggerEvent = function() { //if you don't have enough money, refuses to allow purchase of country. If you do, displays effect and adds effect to player money. Turns yes/no off, end-turn button on.
    if (this.money < countries[this.position][1]) {
      document.getElementById("eventEffect").innerHTML = "You can't afford " + countries[this.position][0] + "!";
    }
    else {
      document.getElementById("eventEffect").innerHTML = countries[this.position][3];
        this.money += countries[this.position][2];
      document.getElementById(this.name).innerHTML = this.name + " $" + this.money;
    }
    endTurnbutton.on();
    yesButton.off();
    noButton.off();
  };

  this.restartGame = function() { //adds $100 to the bank after each turn, removes the all messages from previous moves.
    this.money += 100;
    document.getElementById(this.name).innerHTML = this.name + " $" + this.money;
    document.getElementById("event").innerHTML = "<p></p>";
    document.getElementById("eventEffect").innerHTML = "<p></p>";
    document.getElementById("roll").innerHTML = "<p></p>";
    document.getElementById("eventEffect").innerHTML = "<p></p>";
    endTurnbutton.off();
    if (this.position < countries.length-1) {
      rollButton.on();
    }
    else {
      if (player1.money < player2.money) {
        player1_active = true;
      }
      else {
        player1_active = false;
      }
    }
    if (player1_active) {
      player1_active = false;
    }
    else {
      player1_active = true;
    }
    /*this.winner = function () { //declares a winner
      if (player1.money > player2.money) {
        player1_active = true;
      }
      else {
        player1_active = false;
      }
      document.getElementById("eventEffect").innerHTML = player1.name + " ended the game with $" + this.money;*/
    };
  };
}

function Button(name) { //creates an object for the buttons to be defined in. Creates this.on and this.off functions to disable buttons
  this.name = name;
  this.on = function() {
    document.getElementById(this.name).disabled = false;
  };
  this.off = function() {
    document.getElementById(this.name).disabled = true;
  };
}

var player1 = new Player("Player 1");
var player2 = new Player("Player 2");
var rollButton = new Button("rollButton");
var yesButton = new Button("yesButton");
var noButton = new Button("noButton");
var endTurnbutton = new Button("endTurn");

  /*this.test = function() {
    alert(this.position);
  }*/


function diceRoll() { //diceRoll activation from button, changes between players
  if (player1_active) {
    player1.diceRoll();
  }
  else {
    player2.diceRoll();
  }
}

function triggerEvent() { //trigger changing between players
  if (player1_active) {
    player1.triggerEvent();
  }
  else {
    player2.triggerEvent();
  }
}

function noEvent() { //noEvent remains constant for both players, turns end button on, yes/no off
  document.getElementById("eventEffect").innerHTML = "<p>That's a shame, maybe next turn.</p>";
  endTurnbutton.on();
  yesButton.off();
  noButton.off();
}

function restartGame() {
  if (player1.position < countries.length && player2.position < countries.length) {
    if (player1_active) {
      player1.restartGame();
    }
    else {
      player2.restartGame();
    }
  }
  else {
    endTurnbutton.off();
    player1.winner();
  }
}

function initialize() { //prints player 2 money at the start of the game
  document.getElementById(player1.name).innerHTML = player1.name + " $" + player1.money;
  document.getElementById(player2.name).innerHTML = player2.name + " $" + player2.money;
}

initialize();

/*playerDrop = true;

function confirmPlayers() {
  var dropval = document.getElementById("drop-down").value;
  alert(dropval);
  while (playerDrop) {
    if
  }
  elPlayerNumber = document.getElementById("textbox");
  var playerNumber = elPlayerNumber.value;
  parseInt(playerNumber);
  for (var i = 1; i < playerNumber + 1; i++)
    document.getElementById("players").innerHTML = "<p>Player " + playerNumber + " </p>";

}*/
