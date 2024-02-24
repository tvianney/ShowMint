// SPDX-License-Identifier: MITs
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Ticket.sol";

uint64 constant INITIAL_SUPPLY = 10_000;
address constant WALLET = 0x8F5a1Ccf3D0DE62a25bf594c14e0967fF66461DD;

contract TicketTest is Test {
    Ticket public ticket;

    function createTransferableContract() private {
        ticket = new Ticket(
            "JUL Tour 2024",
            "JUL24",
            uint64(INITIAL_SUPPLY),
            true,
            true,
            "Qmtoto/"
        );
    }

    function createNonTransferableContract() private {
        ticket = new Ticket(
            "JUL Tour 2024",
            "JUL24",
            uint64(1),
            false,
            false,
            "Qmtoto/"
        );
    }

    function testCreation() public {
        createTransferableContract();
        assertEq(ticket.totalSupply(), INITIAL_SUPPLY);
        assertEq(ticket.name(), "JUL Tour 2024");
        assertEq(ticket.symbol(), "JUL24");
    }

    function testMint() public {
        createTransferableContract();
        ticket.mint(WALLET);
        assertEq(ticket.balanceOf(WALLET), 1);
    }

    error OwnableUnauthorizedAccount(address account);

    function testMintBadOwner() public {
        createTransferableContract();
        vm.startPrank(WALLET);
        vm.expectRevert(
            abi.encodeWithSelector(OwnableUnauthorizedAccount.selector, WALLET)
        );
        ticket.mint(WALLET);
        vm.stopPrank();
    }

    function testMintNoSupply() public {
        createNonTransferableContract();
        ticket.mint(WALLET);
        vm.expectRevert(
            bytes("ERC721: ticket is sold out, mint is not allowed")
        );
        ticket.mint(WALLET);
    }

    function testBurn() public {
        testMint();
        ticket.burn(0);
        assertEq(ticket.balanceOf(WALLET), 0);
    }

    function testBurnBadOwner() public {
        testMint();
        vm.startPrank(WALLET);
        vm.expectRevert(
            abi.encodeWithSelector(OwnableUnauthorizedAccount.selector, WALLET)
        );
        ticket.burn(0);
        vm.stopPrank();
    }

    function testBurnNoRefundable() public {
        createNonTransferableContract();
        vm.expectRevert(bytes("ERC721: refund is not allowed for this ticket"));
        ticket.burn(0);
    }

    function testTransferFrom() public {
        testMint();
        vm.startPrank(WALLET);
        ticket.transferFrom(WALLET, address(this), 0);
        assertEq(ticket.balanceOf(WALLET), 0);
        assertEq(ticket.balanceOf(address(this)), 1);
        vm.stopPrank();
    }

    function testTransferFromNoTransferable() public {
        testMintNoSupply();
        vm.expectRevert(
            bytes("ERC721: transfer is not allowed for this ticket")
        );
        ticket.transferFrom(WALLET, address(this), 0);
    }

    function testSafeTransferFromNoTransferable() public {
        testMintNoSupply();
        vm.expectRevert(
            bytes("ERC721: transfer is not allowed for this ticket")
        );
        ticket.safeTransferFrom(WALLET, address(this), 0);
    }

    function testTokenURI() public {
        testMint();
        assertEq(
            ticket.tokenURI(0),
            "Qmtoto/0",
            "tokenURI should return the baseURI + tokenId"
        );
    }
}
