'use strict'

/**
 * Some code to test our test scripts on
 */
class TestClass {
  /**
   * Test
   * @param {String} name
   */
  constructor (name) {
    this.name = name
  }

  /**
   * Print a string backwards
   * @param  {String} str
   * @return {String}
   */
  backwards (str) {
    return str.split('').reverse().join('')
  }

  /**
   * Print name
   * @return {String}
   */
  async printName () {
    return `My name is ${this.name}`
  }

  /**
   * Print name backwards
   * @return {String}
   */
  printNameBackwards () {
    return `My name backwards is ${this.backwards(this.name)}`
  }
}

module.exports = TestClass
