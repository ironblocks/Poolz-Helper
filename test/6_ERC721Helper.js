const ERC721Helper = artifacts.require("ERC721HelperMock")
const ERC721Token = artifacts.require("ERC721Token")
const { assert } = require("chai")
const truffleAssert = require("truffle-assertions")

contract("ERC721 Helper tests", (accounts) => {
    let erc721Helper, erc721Token
    let itemId = 1
    const owner = accounts[0]
    const user = accounts[1]

    before(async () => {
        erc721Helper = await ERC721Helper.new()
        erc721Token = await ERC721Token.new()
        await erc721Token.setApprovalForAll(erc721Helper.address, true)
    })

    beforeEach(async () => {
        await erc721Token.awardItem(owner, itemId)
    })

    afterEach(async () => {
        itemId++
    })

    it("should transfer tokens in contract", async () => {
        await erc721Helper.transferNFTIn(erc721Token.address, itemId, owner)
        const ownerOfNFT = await erc721Token.ownerOf(itemId)
        assert.equal(erc721Helper.address, ownerOfNFT.toString())
    })

    it("should TransferNFTOut tokens from contract", async () => {
        await erc721Helper.transferNFTOut(erc721Token.address, itemId - 1, owner)
        const ownerOfNFT = await erc721Token.ownerOf(itemId)
        assert.equal(owner, ownerOfNFT.toString())
    })

    it("should setApproveForAllNFT", async () => {
        await erc721Helper.setApproveForAllNFT(erc721Token.address, user, true)
        const status = await erc721Token.isApprovedForAll(erc721Helper.address, user)
        assert.equal(true, status)
    })

    it("should return no allowance message", async () => {
        await truffleAssert.reverts(erc721Helper.transferNFTIn(erc721Token.address, itemId, user), "No Allowance")
    })
})
