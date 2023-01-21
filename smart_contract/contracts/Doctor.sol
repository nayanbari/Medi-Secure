// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0 ;

contract Doctor{
    uint public docCount = 0;

    mapping(string => doctor) public docList;

    struct doctor{
        string fullname;
        string qualification;
        string registrationNo;
        string contactNo;
        string email;
    }

    //An event is emitted, it stores the arguments passed in transaction logs.

    event doctorCreated(
        string fullname,
        string qualification,
        string registrationNo,
        string contactNo,
        string email
    );

    function createDoctor(string memory _fullname,string memory _qualification,string memory _registrationNo,string memory _contactNo,string memory _email) public{
        docCount++;

        docList[_registrationNo] = doctor(_fullname,_qualification,_registrationNo,_contactNo,_email);

        emit doctorCreated(_fullname, _qualification, _registrationNo, _contactNo, _email);
    }
}