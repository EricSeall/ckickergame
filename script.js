const LOCALSTORAGEKEY = "ericClickerGame";

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

let items = [bean, carrot, beet];

let state = {
  gold: 0,
  goldPerSecond: 0,
  clickingPower: 1,
  incomeItems: items
};



function clickGold() {
  state.gold += state.clickingPower;
  document.getElementById("gold").innerHTML = state.gold.toString();
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

    document.getElementById("gold").innerHTML = state.gold;
    document.getElementById(itemName + "s").innerHTML = item.count;
    document.getElementById(itemName + "cost").innerHTML = item.cost;
    item.gps = item.count * item.value;
  }
}

function tick() {
  if (state.goldPerSecond > 0) {
    //increment gold along with gps
    state.gold += 1;
  }

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

  document.getElementById("gold").innerHTML = state.gold;
  document.getElementById("goldpersecond").innerHTML = state.goldPerSecond;

  setTimeout(tick, 1000 / state.goldPerSecond);
}

function saveProgress() {
  localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(state));
}

function loadProgress() {
  const raw = localStorage.getItem(LOCALSTORAGEKEY);

  if (raw) {
    state = JSON.parse(raw);
  }

  bean = state.incomeItems[0]
  if (bean.unlocked){
    unlock(bean)
  }
  
  carrot = state.incomeItems[1]
  if (carrot.unlocked){
    unlock(carrot)
  }

  beet = state.incomeItems[2]
  if (beet.unlocked){
    unlock(beet)
  }
}

loadProgress();
tick();
setInterval(saveProgress, 1000);