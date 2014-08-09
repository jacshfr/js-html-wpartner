var totalspaces = 20;
var roll;

function Player(name) {
  this.name = name;
  this.money = 200;
  this.position = 0;
  this.turn = function() {
    this.position += roll;

  }
}
function Country(attrs) {
  this.country = attrs[0];
  this.cost = attrs[1];
  this.effect = attrs[2];
  this.effectMessage = attrs[3];
  this.position = attrs[4];
}

var player1 = new Player("Player 1");

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
}

function diceRoll() {
  roll = Math.floor((Math.random() * 6) + 1);
  document.getElementById("roll").innerHTML = "You rolled a " + roll + "!";
  player1.turn();
  document.getElementById("event").innerHTML = "Would you like to purchase " + countries[player1.position][0] + " for $" + countries[player1.position][1] + "?";
  document.getElementById("player1").innerHTML = player1.name + ": $" + player1.money;
}

function triggerEvent() {
  if (player1.money < countries[player1.position][1]) {
    document.getElementById("eventEffect").innerHTML = "You can't afford " + countries[player1.position][0] + "!";
  }
  else {
    document.getElementById("eventEffect").innerHTML = countries[player1.position][3];
    player1.money += countries[player1.position][2];
    document.getElementById("player1").innerHTML = player1.name + " $" + player1.money;
  }
}

function game() {
  player1.money += 200;
  document.getElementById("player1").innerHTML = player1.name + " $" + player1.money;
  document.getElementById("event").innerHTML = "<p></p>";
  document.getElementById("eventEffect").innerHTML = "<p></p>";
  document.getElementById("roll").innerHTML = "<p></p>";
  document.getElementById("eventEffect").innerHTML = "<p></p>";
}
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
