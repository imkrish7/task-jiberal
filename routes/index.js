const route = require('express').Router();
const config = require('../config');
const Transfer = require('../models/Transfer');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(config.infuraAPI));

async function getERC20Transfers(erc20) {
	let _defaultAccount = erc20 || '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7';
	web3.eth.defaultAccount = _defaultAccount;
	let blockNumber = await web3.eth.getBlockNumber();
	let block = await web3.eth.getBlock(blockNumber);
	for (var transactionIndex in block.transactions) {
		let transactionHash = block.transactions[transactionIndex];
		let transaction = await web3.eth.getTransaction(transactionHash);
		let transfer = new Transfer(transaction);
		transfer['account'] = _defaultAccount;
		transfer.save();
	}
}
// getERC20Transfers();

route.get('/:erc20', async (req, res) => {
	let erc20 = req.params.erc20;
	let transfers = await Transfer.find({ to: erc20 }).limit(10);
	return res.json({ success: true, transfers });
});

route.post('/:erc20', async (req, res) => {
	let erc20 = req.params.erc20;
	await getERC20Transfers(erc20);
	return res.json({ success: true });
});

module.exports = route;
