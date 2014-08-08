function confirmPlayers() {
  elPlayerNumber = document.getElementById("textbox");
  var playerNumber = elPlayerNumber.value;
  parseInt(playerNumber);
  for (var i = 1; i < playerNumber + 1; i++)
    document.getElementById("players").innerHTML = "<p>Player " + playerNumber + " </p>";
  alert(playerNumber);
}
function diceRoll() {
  var roll = Math.floor((Math.random() * 6) + 1);
  document.getElementById("roll").innerHTML = "<p>You rolled a " + roll + "!";
}
//need to figure out positioning.
function triggerEvent() {
  if (Player.position === Country.position){
    console.log(Country.effect);
  }
}

function Player(name) {
  this.name = name;
  this.money = 0;
  this.position = 0;
}
function Country(attrs) {
  this.country = attrs[0];
  this.cost = attrs[1];
  this.effect = attrs[2];
  this.effectMessage = attrs[3];
  this.position = attrs[4]
}
var countries = [
  [Haiti, 10, player.money -= 100, "The Dominican Republic opens their borders for all immigrants. The entire population of Haiti defects. The land is worthless. You lose $100.", 1],
  [Mexico, 30, player.money += 300, "With the legalization of marijuana in the United States, the peso appreciates 1000%. You earn $300.", 2],
  [Iraq, 50, player.money -= 50, "Interesting choice. ISIS immediately takes over and you lose $50. Surprised? Don't be.", 3],
  [Kazakhstan, 75, player.money -= 150, "Remember when Kazakhstan ruined the Aral Sea? The rest of the world does. Global warming happens, water prices rise, you lose $150. Go figure.", 4],
  [Ukraine, 100, player.money -= 200, "The United States has given up on you and Russia has taken over. You lose your investment, and then some. -$200.", 5],
  [Dominican_Republic, 100, player.money += 25, "The Dominican Republic opens its border to all immigrants. Production slightly increases. You earn $25.", 6],
  [Japan, 150, player.money -= 100, "The working population of Japan retires, there is no workforce to take its place. You lost $100.", 7],
  [Australia, 150, player.money -= 100, "Global warming causes temperatures to rise and kangaroos to go extinct. Tourists now have no reason to visit. You lose $100.", 8],
  [England, 200, player.money -= 25, "A large group of reenactors visit London and reenact the Boston Tea Party at the Port of London. Tea prices rise and sales decrease. You lose $25.", 9],
  [Russia, 250, player.money += 200, "Congratulations! Russia has successfully acquired Ukraine. You earn $200.", 10],
  [Canada, 300, player.money, "Tourism in Canada increases 300%. However, the Prime Minister chooses to invest all profits into his maple-syrup expansion plan. You don't profit. Maybe next year!", 11],
  [United_States, 350, player.money -= 1000, "The newly elected United States President decides to pay back the national debt immediately. You lose $1000.", 12],
  [Switzerland, 400, player.money += 200, "World War III begins. Switzerland remains neutral. You earn $200.", 13],
  [United_Arab_Emirates, 400, player.money += 125, "The UAE was rich before and it's still rich now. You earn $125.", 14]
];
for (var i = 0; i < countries.length; i++){
  Country(countries[i]);
}

