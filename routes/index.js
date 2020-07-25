const route = require('express').Router();
const config = require('../config');
const Transfer = require('../models/Transfer');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(config.infuraAPI));

async function getERC20Transfers(erc20) {
	return new Promise(async (resolve, reject) => {
		try {
			let _defaultAccount = '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7';
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

			return resolve({ success: true });
		} catch (error) {
			return reject({ success: false });
		}
	});
}

route.get('/:erc20', async (req, res) => {
	let erc20 = req.params.erc20 || '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7';
	let limit = Number(req.query.limit) || 10;
	let skip = Number(req.query.skip) || 0;

	try {
		let transfers = await Transfer.find({ account: erc20 }).skip(skip).limit(limit);
		return res.status(200).json({ success: true, transfers });
	} catch (error) {
		return res.status(500).json({ success: false, message: 'Internal Error' });
	}
});

route.post('/:erc20', async (req, res) => {
	let erc20 = req.params.erc20 || '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7';
	try {
		getERC20Transfers(erc20);
		return res.status(200).json({ success: true });
	} catch (error) {
		return res.status(500).json({ success: false, message: 'Internal Error' });
	}
});

module.exports = route;
