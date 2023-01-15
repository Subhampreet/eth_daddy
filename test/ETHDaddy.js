const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("ETHDaddy", () => {
  it('has a name', async() => {
    const ETHDaddy = await ethers.getContractFactory('ETHDaddy');
    // deploying to blockchain
    let ethDaddy = await ETHDaddy.deploy();
    // calling the name() function
    const result = await ethDaddy.name();
    expect(result).to.equal('ETH Daddy');
  })
})
