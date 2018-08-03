class stackJS {

  stack: Array<any>
  limit: number
  persistence: any

  constructor(limit : number = Infinity, persistence : any = undefined) {
    this.limit = limit
    this.persistence = persistence
    this.stack = []

    if (typeof persistence !== 'undefined' && typeof persistence.getItem === 'function' && typeof persistence.setItem === 'function') {
      let savedStack = persistence.getItem('stack')
      let savedLimit = persistence.getItem('limit')

      if (typeof savedLimit === 'number') this.limit = savedLimit
      if (savedStack) {
        savedStack = JSON.parse(savedStack)
        if (Array.isArray(savedStack)) this.stack = savedStack
      }

      this.persistence = persistence

      this.normalize()
    } else if (typeof persistence !== 'undefined') {
      throw new Error('Persistence argument object must implement the Storage interface')
    }
  }

  push(value: any) : void {
    this.stack.push(value)
    this.normalize()
  }

  pop() : any {
    let ret = this.stack.pop()
    this.normalize()
    return ret
  }

  size() : number {
    return this.stack.length
  }

  empty() : boolean {
    return this.stack.length === 0
  }

  setlimit(limit: number) : void {
    this.limit = limit
    this.normalize()
  }

  getlimit() : number {
    return this.limit
  }

  swap(instance: any) : void {
    if (!(instance instanceof stackJS))
      throw new Error("Variable must be instance of stack.js")

    let stack1 = this.get()
    let stack2 = instance.get()

    this.set(stack2)
    instance.set(stack1)
  }

  get() : Array<any> {
    return this.stack
  }

  set(arr : Array<any>) : void {
    if (!Array.isArray(arr))
      throw new Error("Variable must be array")

    this.stack = arr
    this.normalize()
  }

  normalize() {
    while (this.stack.length > this.limit) {
      this.stack.shift()
    }
    if (this.persistence) {
      this.persistence.setItem('stack', JSON.stringify(this.stack))
      this.persistence.setItem('limit', JSON.stringify(this.limit))
    }
  }
}

declare var module: any;

if (typeof window === 'undefined')
  module.exports = stackJS
