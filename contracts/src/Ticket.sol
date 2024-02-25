// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ticket is ERC721, Ownable {
    uint64 public totalSupply;
    uint64 public supply;
    bool public isTransferable;
    bool public isRefundable;
    string private __baseURI;

    constructor(
        string memory name_,
        string memory symbol_,
        uint64 totalSupply_,
        bool isTransferable_,
        bool isRefundable_,
        string memory baseURI_
    ) ERC721(name_, symbol_) Ownable(msg.sender) {
        totalSupply = totalSupply_;
        isTransferable = isTransferable_;
        isRefundable = isRefundable_;
        __baseURI = baseURI_;
    }

    function _baseURI() internal view override returns (string memory) {
        return __baseURI;
    }

    function mint(address to) public onlyOwner {
        require(
            supply < totalSupply,
            "ERC721: ticket is sold out, mint is not allowed"
        );
        _safeMint(to, supply);
        unchecked {
            supply++;
        }
    }

    function burn(uint256 tokenId) public onlyOwner {
        require(isRefundable, "ERC721: refund is not allowed for this ticket");
        _burn(tokenId);
        unchecked {
            totalSupply++;
        }
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(
            isTransferable,
            "ERC721: transfer is not allowed for this ticket"
        );
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override {
        require(
            isTransferable,
            "ERC721: transfer is not allowed for this ticket"
        );
        super.safeTransferFrom(from, to, tokenId, data);
    }
}
