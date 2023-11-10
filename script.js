let gold = 0
let goldPerSecond = 0
let clickingPower = 1
let updateRate = 1

let bean = {
    'name': 'Bean',
    'count': 0,
    'cost': 15,
    'value': 1,
    'gps': 0,
    'unlocked': false
}

let carrot = {
    'name': 'Carrot',
    'count': 0,
    'cost': 100,
    'value': 5,
    'gps': 0,
    'unlocked': false
}

let beet = {
    'name': 'Beet',
    'count': 0,
    'cost': 500,
    'value': 15,
    'gps': 0,
    'unlocked': false
}

let items = [bean, carrot, beet]

function clickGold() {
    gold += clickingPower
    document.getElementById('gold').innerHTML = gold.toString()
}

function unlock(item) {
    const itemName = item.name.toString().toLowerCase()
    
    const element = document.getElementById("buttons");
    
    const button = document.createElement("button")
    button.setAttribute('onclick', 'buy(' + itemName + ')')
    const node = document.createTextNode(item.name.toString() + " [")

    const costSpan = document.createElement("span")
    const costText = document.createTextNode(item.cost.toString())
    costSpan.setAttribute('id', itemName + 'cost')
    costSpan.appendChild(costText)

    const divider = document.createTextNode("] -- ")

    const countSpan = document.createElement("span")
    const countText = document.createTextNode(item.count.toString())
    countSpan.setAttribute('id', itemName + 's')
    countSpan.appendChild(countText)

    button.appendChild(node)
    button.appendChild(costSpan)
    button.appendChild(divider)
    button.appendChild(countSpan)

    element.appendChild(button)
}



function buy(item) {
    if (gold >= item.cost) {
        const itemName = item.name.toString().toLowerCase()
        
        item.count += 1
        gold -= item.cost
        item.cost = Math.round(item.cost * 1.15)

        document.getElementById('gold').innerHTML = gold
        document.getElementById(itemName + 's').innerHTML = item.count
        document.getElementById(itemName + 'cost').innerHTML = item.cost
        item.gps = item.count * item.value
    }
}

function tick() {
    if (goldPerSecond > 0){ //increment gold along with gps
        gold += 1
    }
    
    let total = 0
    for (let item of items){ //iterate through, unlock, and calculate goldPerSecond
        total += item.gps
        if (!item.unlocked){
            if (gold >= item.cost){
                unlock(item)
                item.unlocked = true
            }
        }
    
    }
    goldPerSecond = total

    document.getElementById('gold').innerHTML = gold
    document.getElementById('goldpersecond').innerHTML = goldPerSecond

    setTimeout(tick, 1000/goldPerSecond)
}

tick()