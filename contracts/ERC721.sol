// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CustomERC721 is ERC721URIStorage {
    uint256 private _tokenIdCounter;

    constructor() ERC721("CustomERC721", "C721") {}

    function mint(address to, string memory tokenURI) public {
        uint256 tokenId = _tokenIdCounter;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _tokenIdCounter++;
    }
}

