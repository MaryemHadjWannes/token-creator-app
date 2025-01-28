const Web3 = require('web3');
const { abi: erc20Abi, evm: erc20Bytecode } = require('./ERC20.json'); // Deploy compiled files
const { abi: erc721Abi, evm: erc721Bytecode } = require('./ERC721.json');

const web3 = new Web3(process.env.INFURA_URL); // Use Infura or Alchemy

// Create ERC-20 Token
exports.createERC20 = async (req, res) => {
    try {
        const { name, symbol, supply } = req.body;

        const accounts = await web3.eth.getAccounts();
        const deployer = accounts[0];

        const contract = new web3.eth.Contract(erc20Abi);
        const deployTx = contract.deploy({
            data: erc20Bytecode,
            arguments: [name, symbol, supply]
        });

        const gas = await deployTx.estimateGas({ from: deployer });
        const gasPrice = await web3.eth.getGasPrice();

        const deployedContract = await deployTx.send({
            from: deployer,
            gas,
            gasPrice
        });

        res.json({
            contractAddress: deployedContract.options.address,
            status: 'ERC-20 Token Created Successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating ERC-20 token');
    }
};

// Create ERC-721 Token
exports.createERC721 = async (req, res) => {
    try {
        const { tokenURI } = req.body;

        const accounts = await web3.eth.getAccounts();
        const deployer = accounts[0];

        const contract = new web3.eth.Contract(erc721Abi);
        const deployTx = contract.deploy({
            data: erc721Bytecode
        });

        const gas = await deployTx.estimateGas({ from: deployer });
        const gasPrice = await web3.eth.getGasPrice();

        const deployedContract = await deployTx.send({
            from: deployer,
            gas,
            gasPrice
        });

        const mintTx = deployedContract.methods.mint(deployer, tokenURI);
        await mintTx.send({ from: deployer });

        res.json({
            contractAddress: deployedContract.options.address,
            status: 'ERC-721 Token Created and Minted Successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating ERC-721 token');
    }
};
