const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("ETHDaddy", () => {

  let ethDaddy
  let deployer, owner1

  const NAME = 'ETH Daddy';
  const SYMBOL = 'ETHD';

  beforeEach(async() => {
    // Setup Account
    [deployer, owner1] = await ethers.getSigners();    

    // Deploy Contract
    const ETHDaddy = await ethers.getContractFactory('ETHDaddy');
    // deploying to blockchain
    ethDaddy = await ETHDaddy.deploy('ETH Daddy', 'ETHD');

    // List a domain
    const transaction = await ethDaddy.connect(deployer).list("jack.eth", tokens(10))
    await transaction.wait()
  })

  describe('Deployment', () => {
    it('has a name', async() => {    
      // calling the name() function
      let result = await ethDaddy.name();
      expect(result).to.equal(NAME);
    })
  
    it('has a symbol', async() => {
      let result = await ethDaddy.symbol()
      expect(result).to.equal(SYMBOL);
    })

    it('Sets the owner', async() => {
      const result = await ethDaddy.owner()
      expect(result).to.equal(deployer.address);
    })

    it('Returns the max supply', async() => {
      const result = await ethDaddy.maxSupply()
      expect(result).to.equal(1);
    })
  })  

  describe("Domain", () => {
    it('Returns domain attributes', async() => {
      let domain = await ethDaddy.domains(1);
      expect(domain.name).to.be.equal("jack.eth");
      expect(domain.cost).to.be.equal(tokens(10));
      expect(domain.isOwned).to.be.equal(false);
    })
  })
})
