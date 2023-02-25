// TODO refactor buy functions, make more mobile friendly
//  display total kiwis collected over time
// local storage to save game progress on reload

// VARIABLES
let kiwis = 0
let clickPower = 1
let autoPower = 0

// UPGRADES
let upgrades = [
  {
    name: 'shear',
    price: 20,
    quantity: 0,
    multiplier: 2,
    type: 'click'
  },
  {
    name: 'basket',
    price: 50,
    quantity: 0,
    multiplier: 5,
    type: 'click'
  },
  {
    name: 'honey-bee',
    price: 100,
    quantity: 0,
    multiplier: 10,
    type: 'auto'
  },
  {
    name: 'sheep',
    price: 300,
    quantity: 0,
    multiplier: 20,
    type: 'auto'
  }
]

function harvestKiwi() {
  // console.log('Harvesting kiwis')
  // increase kiwis when clicked
  kiwis++
  // iterate through all upgrades, find those that are clicks, if i have one, add that to total clickpower
  upgrades.forEach(u => {
    if (u.type == 'click' && u.quantity >= 1) {
      kiwis += u.multiplier * u.quantity
    }
  })
  // update total kiwis AND total upgrade powers
  updateCount()
}

function collectAutoUpgrades() {
  // iterate through all upgrades, find those w/type auto if I have 1, add that to total autoPower
  upgrades.forEach(u => {
    if (u.type == 'auto' && u.quantity >= 1) {
      kiwis += u.multiplier * u.quantity
    }
  })
  updateCount()
}

function updateCount() {
  // @ts-ignore
  document.getElementById('total-kiwis').innerText = kiwis
  // @ts-ignore
  document.getElementById('click-power').innerText = clickPower
  // @ts-ignore
  document.getElementById('auto-power').innerText = autoPower

  upgrades.forEach(u => {
    let btn = document.getElementById(`${u.name}-button`)
    if (u.price <= kiwis) {
      // console.log(btn)
      // @ts-ignore
      btn.disabled = false
    } else {
      // @ts-ignore
      btn.disabled = true
    }
  })
}

function buyShear() {
  // does shear button work
  // console.log('buying shear')
  // find the shear upgrade in clickUpgrade array
  let upgrade = upgrades.find(upgrade => upgrade.name == 'shear')
  // check if user has enough kiwis
  if (kiwis >= upgrade.price) {
    // decrease kiwi quantity by price of shear (this needs to be first thing or it messes up count!)
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
  let upgrade = upgrades.find(upgrade => upgrade.name == 'basket')
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
  let upgrade = upgrades.find(upgrade => upgrade.name == 'honey-bee')
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
  let upgrade = upgrades.find(upgrade => upgrade.name == 'sheep')
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

setInterval(collectAutoUpgrades, 3000)
updateCount()