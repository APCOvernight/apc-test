'use strict'

/**
 * Some code to test our test scripts on
 */
class TestClass {
  constructor (name) {
    this.name = name
  }

  backwards (str) {
    return str.split('').reverse().join('')
  }

  async printName () {
    return `My name is ${this.name}`
  }

  printNameBackwards () {
    return `My name backwards is ${this.backwards(this.name)}`
  }
}

module.exports = TestClass
