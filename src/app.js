const express = require('express');
const Web3 = require('web3');
const dotenv = require('dotenv');
const tokenController = require('./tokenController');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/create-erc20', tokenController.createERC20);
app.post('/create-erc721', tokenController.createERC721);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


document.getElementById('erc20-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('erc20-name').value;
    const symbol = document.getElementById('erc20-symbol').value;
    const supply = document.getElementById('erc20-supply').value;

    const response = await fetch('/create-erc20', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, symbol, supply })
    });

    const data = await response.json();
    alert('ERC-20 Token created at: ' + data.contractAddress);
});

document.getElementById('erc721-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const tokenURI = document.getElementById('erc721-uri').value;

    const response = await fetch('/create-erc721', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenURI })
    });

    const data = await response.json();
    alert('ERC-721 Token created at: ' + data.contractAddress);
});
