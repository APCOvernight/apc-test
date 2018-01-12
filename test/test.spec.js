const chai = require('chai')
chai.use(require('sinon-chai'))
const expect = chai.expect
const sinon = require('sinon')
const Test = require('../src/test')

describe('Some fake tests to check our dependencies are working', () => {
  it('Chai asserts true is not false', () => {
    expect(true).to.not.equal(false)
  })

  it('Chai catches error', () => {
    try {
      expect(true).to.equal(false)
      throw new Error()
    } catch (e) {
      expect(e.message).to.equal('expected true to equal false')
    }
  })

  it('Test our test class', async () => {
    const test = new Test('Dave')

    expect(await test.printName()).to.equal('My name is Dave')
  })

  it('Sinon can spy on a method', () => {
    const test = new Test('Dave')
    const backwardsSpy = sinon.spy(test, 'backwards')
    expect(test.printNameBackwards()).to.equal('My name backwards is evaD')
    expect(backwardsSpy).to.be.calledWith('Dave')
  })
})
