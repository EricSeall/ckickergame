/*function unlockCursor() { //span -> button -> div
    const element = document.getElementById("buttons");
    
    const button = document.createElement("button")
    button.setAttribute('onclick', 'buyCursor()')
    const node = document.createTextNode("Cursor [")

    const costSpan = document.createElement("span")
    const costText = document.createTextNode(cursor.cost.toString())
    costSpan.setAttribute('id', 'cursorcost')
    costSpan.appendChild(costText)

    const divider = document.createTextNode("] -- ")

    const countSpan = document.createElement("span")
    const countText = document.createTextNode(cursor.count.toString())
    countSpan.setAttribute('id', 'cursors')
    countSpan.appendChild(countText)

    button.appendChild(node)
    button.appendChild(costSpan)
    button.appendChild(divider)
    button.appendChild(countSpan)

    element.appendChild(button)
}

function unlockGrandma() { //span -> button -> div
    const element = document.getElementById("buttons");
    
    const button = document.createElement("button")
    button.setAttribute('onclick', 'buyGrandma()')
    const node = document.createTextNode("Grandma [")

    const costSpan = document.createElement("span")
    const costText = document.createTextNode(grandma.cost.toString())
    costSpan.setAttribute('id', 'grandmacost')
    costSpan.appendChild(costText)

    const divider = document.createTextNode("] -- ")

    const countSpan = document.createElement("span")
    const countText = document.createTextNode(grandma.count.toString())
    countSpan.setAttribute('id', 'grandmas')
    countSpan.appendChild(countText)

    button.appendChild(node)
    button.appendChild(costSpan)
    button.appendChild(divider)
    button.appendChild(countSpan)

    element.appendChild(button)
}*/

/*function buyCursor() {
    if (score >= cursor.cost) {
        cursor.count += 1
        score -= cursor.cost
        cursor.cost = Math.round(cursor.cost * 1.15)

        document.getElementById('score').innerHTML = score
        document.getElementById('cursors').innerHTML = cursor.count
        document.getElementById('cursorcost').innerHTML = cursor.cost
    }
}

function buyGrandma() {
    if (score >= grandma.cost) {
        grandma.count += 1
        score -= grandma.cost
        grandma.cost = Math.round(grandma.cost * 1.15)

        document.getElementById('score').innerHTML = score
        document.getElementById('grandmas').innerHTML = grandma.count
        document.getElementById('grandmacost').innerHTML = grandma.cost
    }
}*/


    /*if (!bean.unlocked){
        if (gold >= bean.cost){
            unlock(bean)
            bean.unlocked = true
        }
    }

    if (!carrot.unlocked){
        if (gold >= carrot.cost){
            unlock(carrot)
            carrot.unlocked = true
        }
    }

    if (!beet.unlocked){
        if (gold >= beet.cost){
            unlock(beet)
            beet.unlocked = true
        }
    }*/