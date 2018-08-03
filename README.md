stack.js
========

Stack implementation in TypeScript for Node and the browser.

Stacks are data containers that can only be accessed (read or modified) at the top. This library enables you to use and manage stacks, limited or not, persistent or not.

Installing
----------

```bash
npm i stack.js
```

Usage
-----

On **Node** (ES5):

```javascript
const stackJS = require('stack.js')
```

On **Node** (ES6+):

```javascript
import stackJS from 'stack.js'
```

On **browsers** (locally):

```html
<script src="node_modules/stack.js/index.js"></script>
```

On **browsers** (CDN):
```html
<script src="https://cdn.rawgit.com/jesobreira/stack.js/master/index.js"></script>
```

Example
-------

```javascript
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
```

Contributing
------------

1. Install TypeScript
2. Clone this repo & `npm i`
3. Hack
4. `npm run build` & PR

License
-------

MIT.
