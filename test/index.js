const stackJS = require('../')

// Standard unlimited stack
let myStack = new stackJS()

myStack.push("a")
myStack.push("b")
myStack.push("c")

console.log(myStack.pop()) // "c"
console.log(myStack.size()) // 2

let anotherStack = new stackJS()
anotherStack.push(1)
anotherStack.push(2)

// Swapping stacks
anotherStack.swap(myStack)

console.log(myStack.get()) // [1,2]

// Limit the amount of items
myStack.setlimit(2)
myStack.push(3)

console.log(myStack.get()) // [2,3]

// You can also initialize a limited stack. Just do so:
let myLimitedStack = new stackJS(2)

// Persistent stack using localstorage-ponyfill
const { createLocalStorage } = require('localstorage-ponyfill')
const localStorage = createLocalStorage()
let myPersistentStack = new stackJS(Infinity, localStorage)

// Let's test it
if (myPersistentStack.size() > 0) {
  console.log("You have opened this test last time at "+myPersistentStack.pop())
} else {
  console.log("You have never opened this test before.")
}

myPersistentStack.push( (new Date()).toLocaleString() )
