pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;
    uint256 private seed;

    mapping(address => uint256) lastWavedAt;
    struct Wave {
        address waver;
        string message;
        uint timestamp;
    }
    event NewWave(address indexed from, string message, uint256 timestamp);
    Wave[] public waves;


    constructor() payable {
        totalWaves = 0;
        seed = (block.timestamp + block.difficulty) % 100;
    }
    

    function wave(string memory message) public {
  
        require(lastWavedAt[msg.sender] + 15 minutes < block.timestamp, "Wait 15mins");
        
        lastWavedAt[msg.sender] = block.timestamp;        

        totalWaves += 1;
        waves.push(Wave(msg.sender, message, block.timestamp));

        seed = (seed + block.timestamp + block.difficulty) % 100;
        
        console.log("Seed is ", seed);
        if(seed <= 50) {
            console.log("Prize awarded");
            uint256 prizeAmount = 0.00001 ether;
            require(prizeAmount <=  address(this).balance, "Sorry, Im broke");
           (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to transfer money");
        }
        emit NewWave(msg.sender, message, block.timestamp);
    }

     function getWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }
}