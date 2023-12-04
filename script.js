const LOCALSTORAGEKEY = "ericClickerGame";

const FPS = 60

let closeTime = null
let openTime = null

let bean = {
  name: "Bean",
  count: 0,
  cost: 15,
  value: 1,
  gps: 0,
  unlocked: false,
};

let carrot = {
  name: "Carrot",
  count: 0,
  cost: 100,
  value: 5,
  gps: 0,
  unlocked: false,
};

let beet = {
  name: "Beet",
  count: 0,
  cost: 500,
  value: 15,
  gps: 0,
  unlocked: false,
};

let potato = {
  name: "Potato",
  count: 0,
  cost: 1000,
  value: 50,
  gps: 0,
  unlocked: false,
};

let items = [bean, carrot, beet, potato];

let state = {
  gold: 0,
  goldPerSecond: 0,
  clickingPower: 1,
  incomeItems: items
}

///////////////////////////////////////////////////////////////
// Helper functions
///////////////////////////////////////////////////////////////

function round(number){
  return Math.floor(number)
}


///////////////////////////////////////////////////////////////
// Game Logic Functions
///////////////////////////////////////////////////////////////

function clickGold() {
  state.gold += state.clickingPower;
  document.getElementById("gold").innerHTML = round(state.gold);
}

function unlock(item) {
  const itemName = item.name.toString().toLowerCase();

  const element = document.getElementById("buttons");

  const button = document.createElement("button");
  button.setAttribute("onclick", "buy(" + itemName + ")");
  const node = document.createTextNode(item.name.toString() + " [");

  const costSpan = document.createElement("span");
  const costText = document.createTextNode(item.cost.toString());
  costSpan.setAttribute("id", itemName + "cost");
  costSpan.appendChild(costText);

  const divider = document.createTextNode("] -- ");

  const countSpan = document.createElement("span");
  const countText = document.createTextNode(item.count.toString());
  countSpan.setAttribute("id", itemName + "s");
  countSpan.appendChild(countText);

  button.appendChild(node);
  button.appendChild(costSpan);
  button.appendChild(divider);
  button.appendChild(countSpan);

  element.appendChild(button);
}

function buy(item) {
  if (state.gold >= item.cost) {
    const itemName = item.name.toString().toLowerCase();

    item.count += 1;
    state.gold -= item.cost;
    item.cost = Math.round(item.cost * 1.15);

    document.getElementById("gold").innerHTML = round(state.gold);
    document.getElementById(itemName + "s").innerHTML = item.count;
    document.getElementById(itemName + "cost").innerHTML = item.cost;
    item.gps = item.count * item.value;
  }
}
function updateGold(){
    //increment gold along with gps
    state.gold += state.goldPerSecond/FPS;
}
function tick() {
  
  updateGold();

  let total = 0;
  for (let item of state.incomeItems) {
    //iterate through, unlock, and calculate goldPerSecond
    total += item.gps;
    if (!item.unlocked) {
      if (state.gold >= item.cost) {
        unlock(item);
        item.unlocked = true;
      }
    }
  }
  state.goldPerSecond = total;

  document.getElementById("gold").innerHTML = round(state.gold);
  document.getElementById("goldpersecond").innerHTML = state.goldPerSecond;

  setTimeout(tick, 1000 / FPS);
}

function saveProgress() {
  localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(state));
}

function loadProgress() {
  const raw = localStorage.getItem(LOCALSTORAGEKEY);

  if (raw) {
    let tempState = JSON.parse(raw);
    
    state.gold = tempState.gold;
    state.goldPerSecond = tempState.goldPerSecond;
    state.clickingPower = tempState.clickingPower;

    for (let i = 0; i < tempState.incomeItems.length; i++){
      state.incomeItems[i] = tempState.incomeItems[i];
    }

    bean = state.incomeItems[0];
    if (bean.unlocked){
      unlock(bean);
    }
  
    carrot = state.incomeItems[1];
    if (carrot.unlocked){
      unlock(carrot);
    }

    beet = state.incomeItems[2];
    if (beet.unlocked){
      unlock(beet);
    }

    potato = state.incomeItems[3];
    if (potato.unlocked){
      unlock(potato);
    }
  } 
}

function updateHeader(){
  let header = document.getElementById('header')
  header.innerHTML = round(state.gold) + " Gold - Farmer Clicker"
}

function backgroundUpdate(){
  let goldWhileGone = 0

  if (document.visibilityState === "hidden") {
    closeTime = Date.now()
    console.log("time is now " + closeTime)
    console.log("visibility is now " + document.visibilityState)
  } else {
    openTime = Date.now()
    goldWhileGone = state.goldPerSecond * Math.floor((openTime - closeTime)/1000)
    console.log("time is now " + openTime)
    console.log('time elapsed: ' + (openTime - closeTime))
    console.log("gold per second: " + state.goldPerSecond)
    console.log('gold while gone: ' + goldWhileGone)
    state.gold += goldWhileGone
    console.log("visibility is now " + document.visibilityState)
  }
}
document.addEventListener("visibilitychange", backgroundUpdate);
loadProgress();
tick();
setInterval(saveProgress, 1000);
setInterval(updateHeader, 5000);