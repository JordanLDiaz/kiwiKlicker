// VARIABLES
let kiwis = 0
let clickPower = 1
let autoPower = 0

// UPGRADES
let clickUpgrades = [
  {
    name: 'shear',
    price: 20,
    quantity: 0,
    multiplier: 2
  },
  {
    name: 'basket',
    price: 50,
    quantity: 0,
    multiplier: 5
  }
];

let autoUpgrades = [
  {
    name: 'honey-bee',
    price: 100,
    quantity: 0,
    multiplier: 10
  },
  {
    name: 'sheep',
    price: 300,
    quantity: 0,
    multiplier: 20
  }
];

function harvestKiwi() {
  // does button even work?
  console.log('Harvesting kiwis')
  // increase kiwis when clicked
  kiwis++
  // iterate through all of my click upgrades, if i have one, add that to total clickpower
  clickUpgrades.forEach(c => {
    if (c.quantity >= 1) {
      kiwis += c.multiplier * c.quantity
    }
  })
  // update total kiwis AND total upgrade powers
  updateCount()
}

function updateCount() {
  // @ts-ignore
  document.getElementById('total-kiwis').innerText = kiwis
  // @ts-ignore
  document.getElementById('click-power').innerText = clickPower
  // @ts-ignore
  document.getElementById('auto-power').innerText = autoPower
}

function buyShear() {
  // does shear button work
  // console.log('buying shear')
  // find the shear upgrade in clickUpgrade array
  let upgrade = clickUpgrades.find(upgrade => upgrade.name == 'shear')
  // check if user has enough kiwis
  if (kiwis >= upgrade.price) {
    // decrease kiwi quantity by price of shear
    kiwis -= upgrade.price
    // if they do, increase shear purchased quantity by 1, by grabbing that elem and resetting its value
    upgrade.quantity++
    let shearQuantityElem = document.getElementById('shear-quantity')
    // @ts-ignore
    shearQuantityElem.innerText = upgrade.quantity
    // update price of shear upgrade by grabbing shear price elem and setting it to the new upgrade price
    upgrade.price += 20
    let shearPriceElem = document.getElementById('shear-price')
    // @ts-ignore
    shearPriceElem.innerText = upgrade.price
    // increase the clickPower by the upgrades 'multiplier'
    clickPower += upgrade.multiplier
  } else {
    alert('Not enough kiwis, keep harvesting!')
  }
  // actually updates the kiwi count and click-power count
  updateCount()
}

function buyBasket() {
  // console.log('buying basket')
  let upgrade = clickUpgrades.find(upgrade => upgrade.name == 'basket')
  if (kiwis >= upgrade.price) {
    kiwis -= upgrade.price
    upgrade.quantity++
    let basketQuantityElem = document.getElementById('basket-quantity')
    // @ts-ignore
    basketQuantityElem.innerText = upgrade.quantity
    upgrade.price += 50
    let basketPriceElem = document.getElementById('basket-price')
    // @ts-ignore
    basketPriceElem.innerText = upgrade.price
    clickPower += upgrade.multiplier
  } else {
    alert('Not enough kiwis, keep harvesting')
  }
  updateCount()
}

function buyBee() {
  console.log('buying bees')
  let upgrade = autoUpgrades.find(upgrade => upgrade.name == 'honey-bee')
  if (kiwis >= upgrade.price) {
    kiwis -= upgrade.price
    upgrade.quantity++
    let beeQuantityElem = document.getElementById('bee-quantity')
    // @ts-ignore
    beeQuantityElem.innerText = upgrade.quantity
    upgrade.price += 100
    let beePriceElem = document.getElementById('bee-price')
    // @ts-ignore
    beePriceElem.innerText = upgrade.price
    autoPower += upgrade.multiplier
  } else {
    alert('Not enough kiwis, keep harvesting!')
  }
  updateCount()
  collectAutoUpgrades()
}

function buySheep() {
  console.log('buying sheep')
  let upgrade = autoUpgrades.find(upgrade => upgrade.name == 'sheep')
  if (kiwis >= upgrade.price) {
    kiwis -= upgrade.price
    upgrade.quantity++
    let sheepQuantityElem = document.getElementById('sheep-quantity')
    // @ts-ignore
    sheepQuantityElem.innerText = upgrade.quantity
    upgrade.price += 300
    let sheepPriceElem = document.getElementById('sheep-price')
    // @ts-ignore
    sheepPriceElem.innerText = upgrade.price
    autoPower += upgrade.multiplier
  } else {
    alert('Not enough kiwis, keep harvesting!')
  }
  updateCount()
  collectAutoUpgrades()
}


// TODO why does it immediately give me the autoupgrade without waiting 3 sec?
function collectAutoUpgrades() {
  // iterate through all my auto upgrades, if I have 1, add that to total autoPower
  autoUpgrades.forEach(a => {
    if (a.quantity >= 1) {
      kiwis += a.multiplier * a.quantity
    }
  })
  updateCount()
}

setInterval(collectAutoUpgrades, 3000)