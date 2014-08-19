
//declares variables
var roll;
var player1_active = true;
var countries = [
  ["Test", 0, 0, "Arrays don't start at 1"],
  ["Korea (Buy one, get the other one.)", 100, 50, "Kim Jong Un insists he is a magician who can create money. Regardless, you earn $50."],
  ["Haiti", 10, -100, "The Dominican Republic opens their borders for all immigrants. The entire population of Haiti defects. The land is worthless. You lose $100."],
  ["Mexico", 30, 300, "With the legalization of marijuana in the United States, the peso appreciates 1000%. You earn $300."],
  ["Iraq", 50, -150, "Interesting choice. ISIS immediately takes over. You lose $150. Surprised? Don't be."],
  ["Kazakhstan", 75, -175, "Remember when Kazakhstan ruined the Aral Sea? The rest of the world does. Global warming happens, water prices rise, you lose $175. Go figure."],
  ["Italy", 150, 50, "Italy changes its name to Atlantis as global warming causes it to sink below ocean level. Tourism dramatically increases. You earn $50."],
  ["Ivory Coast", 100, 200, "Conflict diamonds become all the rage. You earn $200."],
  ["Ukraine", 150, -200, "The United States gives up on Ukraine and Russia takes over. You lose your investment and then some. -$200."],
  ["Dominican Republic", 100, 25, "The Dominican Republic opens its border to all immigrants. Population nearly doubles. Production slightly increases. You earn $25."],
  ["Japan", 150, -100, "The working population of Japan retires. There is no workforce to take its place. You lose $100."],
  ["Australia", 250, -100, "Global warming causes temperatures to rise and kangaroos to go extinct. Tourists now have no reason to visit. You lose $100."],
  ["Egypt", 125, 50, "Tomb Raider 15 is released, causing rumors that undiscovered pyramids in Egypt exist. Pyramid plunders flood to Egypt, where shovel sales rise dramatically. You earn $50."],
  ["England", 200, -25, "A large group of reenactors visit London and reenact the Boston Tea Party at the Port of London. Tea stocks fall, prices rise, and sales decrease. You lose $25."],
  ["Switzerland", 450, 200, "World War III begins. Switzerland remains neutral. You earn $200."],
  ["Russia", 250, 150, "Russia successfully acquires Ukraine. You earn $150."],
  ["Guinea", 75, -150, "An ebola epidemic kills the entire population. You lose $150."],
  ["Canada", 400, 0, "Tourism in Canada increases 300%. However, the Prime Minister chooses to invest all profits into his maple syrup expansion plan. You don't profit. Maybe next year!"],
  ["Netherlands", 275, -75, "The legalization of marijuana in the United States leads to a decline in tourism for the Netherlands. At least the prostitutes are still world-class. You only lose $75."],
  ["United States", 500, -1000, "The newly elected United States President decides to pay back the national debt immediately. You lose $1000."],
  ["United Arab Emirates", 550, 125, "The UAE was rich before and it's still rich now. You earn $125."],
];

function Player(name) { //player object creator
  this.name = name;
  this.money = 200;
  this.position = 0;
  this.turn = function() {//checks to see if out of room on board, moves player
    if ((this.position + roll) >= countries.length-1) {
      this.position = countries.length-1;
    }
    else {
      this.position += roll;
    }
  };

  this.diceRoll = function() { //activates number roll, creates question, turns yes and no buttons on.
    roll = Math.floor((Math.random() * 4) + 1);
    this.turn();
    $("#roll").text(this.name + " rolled a " + roll + "!");
    document.getElementById("event").innerHTML = "Would " + this.name + " like to purchase " + countries[this.position][0] + " for $" + countries[this.position][1] + "?";
    document.getElementById(this.name).innerHTML = this.name + " $" + this.money;
    rollButton.off();
    yesButton.on();
    noButton.on();
  };

  this.triggerEvent = function() { //if you don't have enough money, refuses to allow purchase of country. If you do, displays effect and adds effect to player money. Turns yes/no off, end-turn button on.
    endTurnbutton.on();
    yesButton.off();
    noButton.off();
    if (this.money < countries[this.position][1]) {
      document.getElementById("eventEffect").innerHTML = "You can't afford " + countries[this.position][0] + "!";
    }
    else {
      document.getElementById("eventEffect").innerHTML = countries[this.position][3];
        this.money += countries[this.position][2];
      document.getElementById(this.name).innerHTML = this.name + " $" + this.money;
    }
  };

  this.restartGame = function() { //adds $100 to the bank after each turn, removes the all messages from previous moves.
    this.money += 100;
    document.getElementById(this.name).innerHTML = this.name + " $" + this.money;
    document.getElementById("event").innerHTML = "<p></p>";
    document.getElementById("roll").innerHTML = "<p></p>";
    document.getElementById("eventEffect").innerHTML = "<p></p>";
    endTurnbutton.off();
    rollButton.on();
    if (player1_active) {
      player1_active = false;
    }
    else {
      player1_active = true;
    }
  };
}

function Button(name) { //Button object creator to turn buttons on or off
  this.name = name;
  this.on = function() {
    document.getElementById(this.name).disabled = false;
  };
  this.off = function() {
    document.getElementById(this.name).disabled = true;
  };
}

//creates player objects
var player1 = new Player("Player1");
var player2 = new Player("Player2");
//creates button objects
var rollButton = new Button("rollButton");
var yesButton = new Button("yesButton");
var noButton = new Button("noButton");
var endTurnbutton = new Button("endTurn");

$("#rollButton").on("click", function() { //diceRoll activation from button, changes between players
  if (player1_active) {
    player1.diceRoll();
  }
  else {
    player2.diceRoll();
  }
})

$("#yesButton").on("click", function() { //trigger changing between players
  if (player1_active) {
    player1.triggerEvent();
  }
  else {
    player2.triggerEvent();
  }
})

$("#noButton").on("click", function() { //noEvent remains constant for both players, turns end button on, yes/no off
  $("#eventEffect").text("That's a shame, maybe next turn.");
  endTurnbutton.on();
  yesButton.off();
  noButton.off();
})

$("#endTurn").on("click", function() {//restart game per player or if game is over calls function to decide who winner is
  //checks to see if both player are still on the board
  if (player1.position < countries.length-1 && player2.position < countries.length-1) {
    //if they are, starts their turns
    if (player1_active) {
      player1.restartGame();
    }
    else {
      player2.restartGame();
    }
  }
  //if they have reached the end of the board, declares winner
  else {
    endTurnbutton.off();
    whoIsWinner();
  }
})

function whoIsWinner() { //decides and declares a winner
  $(".text").text("");
  if (player1.money > player2.money) {
    $("#eventEffect").text(player1.name + " wins with $" + player1.money + "!");
  }
  else {
    $("#eventEffect").text(player2.name + " wins with $" + player2.money + "!");
  }
}

function initialize() { //prints player 2 money at the start of the game, turns off all buttons except roll
  $("#" + player1.name).text(player1.name + " $" + player1.money);
  $("#" + player2.name).text(player2.name + " $" + player2.money);
  yesButton.off();
  noButton.off();
  endTurnbutton.off();
}

initialize(); //sets up game
