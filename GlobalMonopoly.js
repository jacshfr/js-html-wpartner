var totalspaces = 20;
var roll, winner;
var spaceLeft = true;
var player1_active = true;

function Player(name) {
  this.name = name;
  this.money = 200;
  this.position = -1;
  this.turn = function() {
    if ((this.position + roll) > countries.length) {
      this.position = countries.length - 1;
    }
    else {
    this.position += roll;
    }
  }
  this.test = function() {
    alert(this.position);
  }
  this.diceRoll = function() {
    roll = Math.floor((Math.random() * 6) + 1);
    this.turn();
    document.getElementById("roll").innerHTML = this.name + " rolled a " + roll + "!";
    document.getElementById("event").innerHTML = "Would " + this.name + " like to purchase " + countries[this.position][0] + " for $" + countries[this.position][1] + "?";
    document.getElementById(this.name).innerHTML = this.name + " $" + this.money;
    rollButton.off();
    yesButton.on();
    noButton.on();
  }
  this.triggerEvent = function() {
    if (this.money < countries[this.position][1]) {
    document.getElementById("eventEffect").innerHTML = this.name + " can't afford " + countries[this.position][0] + "!";
    }
    else {
      document.getElementById("eventEffect").innerHTML = countries[this.position][3];
      this.money += countries[this.position][2];
      document.getElementById(this.name).innerHTML = this.name + " $" + this.money;
    }
    endTurnbutton.on();
    yesButton.off();
    noButton.off();
  }
  this.restartGame = function() {
    this.money += 200;
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
      else if (player1.money > player2.money) {
        player1_active = false;
      }
      else {
      }
    }
    if (player1_active) {
      player1_active = false;
    }
    else {
      player1_active = true;
    }
  this.winner = function () {
    if (player1.money > player2.money) {
      player1_active = true;
    }
    else {
      player1_active = false;
    }
    document.getElementById("eventEffect").innerHTML = this.name + " ended game with $" + this.money;
  }
  }
}


function Button(name) {
  this.name = name;
  this.on = function() {
    document.getElementById(this.name).disabled=false;
  }
  this.off = function() {
    document.getElementById(this.name).disabled=true;
  }
}

var player1 = new Player("Player 1 ");
var player2 = new Player("Player 2 ");
var rollButton = new Button("rollButton");
var yesButton = new Button("yesButton");
var noButton = new Button("noButton");
var endTurnbutton = new Button("endTurn");

var countries = [
  ["Haiti", 10, -100, "The Dominican Republic opens their borders for all immigrants. The entire population of Haiti defects. The land is worthless. You lose $100.", 1],
  ["Mexico", 30, 300, "With the legalization of marijuana in the United States, the peso appreciates 1000%. You earn $300.", 2],
  ["Iraq", 50, -50, "Interesting choice. ISIS immediately takes over and you lose $50. Surprised? Don't be.", 3],
  ["Kazakhstan", 75, -150, "Remember when Kazakhstan ruined the Aral Sea? The rest of the world does. Global warming happens, water prices rise, you lose $150. Go figure.", 4],
  ["Ukraine", 100, -200, "The United States has given up on you and Russia has taken over. You lose your investment, and then some. -$200.", 5],
  ["Dominican Republic", 100, 25, "The Dominican Republic opens its border to all immigrants. Production slightly increases. You earn $25.", 6],
  ["Japan", 150, -100, "The working population of Japan retires, there is no workforce to take its place. You lost $100.", 7],
  ["Australia", 150, -100, "Global warming causes temperatures to rise and kangaroos to go extinct. Tourists now have no reason to visit. You lose $100.", 8],
  ["England", 200, -25, "A large group of reenactors visit London and reenact the Boston Tea Party at the Port of London. Tea prices rise and sales decrease. You lose $25.", 9],
  ["Russia", 250, 200, "Congratulations! Russia has successfully acquired Ukraine. You earn $200.", 10],
  ["Canada", 300, 0, "Tourism in Canada increases 300%. However, the Prime Minister chooses to invest all profits into his maple-syrup expansion plan. You don't profit. Maybe next year!", 11],
  ["United States", 350, -1000, "The newly elected United States President decides to pay back the national debt immediately. You lose $1000.", 12],
  ["Switzerland", 400, 200, "World War III begins. Switzerland remains neutral. You earn $200.", 13],
  ["United Arab_Emirates", 400, 125, "The UAE was rich before and it's still rich now. You earn $125.", 14]
];

function noEvent() {
  document.getElementById("eventEffect").innerHTML = "<p>That's a shame, maybe next turn.</p>";
  endTurnbutton.on();
  yesButton.off();
  noButton.off();
}

function diceRoll() {
  if (player1_active) {
    player1.diceRoll();
  }
  else {
    player2.diceRoll();
  }
}

function triggerEvent() {
  if (player1_active) {
    player1.triggerEvent();
  }
  else {
    player2.triggerEvent();
  }
}

function restartGame() {
  if (player1.position < countries.length - 1 && player2.position < countries.length - 1) {
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

function initialize() {
  yesButton.off();
  noButton.off();
  endTurnbutton.off();
  document.getElementById(player1.name).innerHTML = player1.name + " $" + player1.money;
  document.getElementById(player2.name).innerHTML = player2.name + " $" + player2.money;
}

initialize();
