// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0 ;


contract Auth{
    uint public userCount = 0;

    mapping(string => user) public userList;

    struct user{
        string fullname;
        string aadharno;
        string email;
        string contactno;
        string gender;
        string dateofbirth;
        string uaddress;
    }

    event userCreated(
        string fullname,
        string aadharno,
        string email,
        string contactno,
        string gender,
        string dateofbirth,
        string uaddress
    );

    function createUser(string memory _fullname,string memory _aadharno,string memory _email,string memory _contactno,string memory _gender,string memory _dateofbirth,string memory _uaddress) public {
        userCount++;

        userList[_aadharno] = user(_fullname,_aadharno,_email,_contactno,_gender,_dateofbirth,_uaddress);

        emit userCreated(_fullname,_aadharno,_email,_contactno,_gender,_dateofbirth,_uaddress);
    }

}