// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CeloEngageHub {
    struct Project {
        address author;
        string title;
        string description;
        string link;
        uint timestamp;
    }

    Project[] public projects;

    function submitProject(string memory _title, string memory _description, string memory _link) public {
        projects.push(Project(msg.sender, _title, _description, _link, block.timestamp));
    }

    function getProject(uint _index) public view returns (address, string memory, string memory, string memory, uint) {
        Project memory p = projects[_index];
        return (p.author, p.title, p.description, p.link, p.timestamp);
    }

    function totalProjects() public view returns (uint) {
        return projects.length;
    }
}
