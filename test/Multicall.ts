import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  it("calls correctly",async function() {
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    await storage.deployed();
    console.log('storage deployed at:'+ storage.address)
    const Multicall = await ethers.getContractFactory("Multicall");
    const multicall = await Multicall.deploy();
    await multicall.deployed();
    console.log(storage.interface.encodeFunctionData("store",[BigNumber.from(4)]))
    const results = await multicall.multicall([
      storage.interface.encodeFunctionData("store",[4]),
      storage.interface.encodeFunctionData("retrieve")
    ],[
      storage.address,
      storage.address
    ])
    await results.wait();
   
    console.log("retrieve:",results);
    console.log(await storage.retrieve());
    console.log(await (await storage.retrieve()).toString());
  })
});
