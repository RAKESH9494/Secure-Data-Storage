// SPDX-License-Identifier:MIT
pragma solidity ^0.8.1;
contract DataStoringOrg{
    address payable Owner;
    constructor(){
        Owner = payable(msg.sender);
    }
    struct File{
        string name;
        string link;
        uint timestamp;
        address[] access;
    }
    struct Notification{
        address Message;
        string link;
        string name;
        uint timestamp;
    }
    struct user{
        string Fname;
        string LName;
        string gmail;
        address owner;
        string password;
    }
    user[] Users;
    mapping(address => File[]) Files;
    mapping(address=>Notification[]) Notifications;
    function checksignup(address pubkey) public view returns(bool){
        for(uint i=0;i<Users.length;i++){
            if(Users[i].owner == pubkey){
                return true;
            }
        }
        return false;
    }
    function Signup(string memory _Fname,string memory _Lname,string memory pw,string memory _gmail,address Pubkey) public payable{
        require(checksignup(Pubkey)==false,"You have allready signup");
        require(msg.value >0,"You have pay 0>");
        Owner.transfer(msg.value);
        Users.push(user({
            Fname    : _Fname,
            password : pw,
            LName    : _Lname,
            gmail    : _gmail,
            owner    : Pubkey
        }));
    }
    function Login(address userKey,string memory password) public view returns(bool){
        require(checksignup(userKey),"User Not Found");
        for(uint i=0;i<Users.length;i++){
            if(Users[i].owner == userKey && keccak256(abi.encodePacked(Users[i].password)) == keccak256(abi.encodePacked(password))){
                return true;    
            }
        }
        return false;
    }
    function checkUser(address pubkey) public view returns(bool){
        for(uint i=0;i<Users.length;i++){
            if(Users[i].owner == pubkey){
                return true;    
            }
        }
        return false;
    }
    function UploadFiles(string memory _name,string memory url,address pubkey) public payable{
        Owner.transfer(msg.value);
        Files[pubkey].push(File({
            name:_name,
            link:url,
            timestamp:block.timestamp,
            access:new address[](0)
        }));
    }
    function deleteFile(string memory url, address pubkey) public {
        for(uint i = 0; i < Files[pubkey].length; i++) {
            if(keccak256(abi.encodePacked(Files[pubkey][i].link)) == keccak256(abi.encodePacked(url))) {
                for(uint k = i; k < Files[pubkey].length - 1; k++) {
                    Files[pubkey][k] = Files[pubkey][k + 1];
                }
                delete Files[pubkey][Files[pubkey].length - 1];
                if(Files[pubkey].length > 0) {
                    Files[pubkey].pop();
                }
                break;
            }
        }
    }

    function getData()public view returns(user[] memory){
        return Users;
    }
    function FilesData(address pubkey) public view returns(File[] memory){
        return Files[pubkey];
    }
    function NotificationData(address pubkey) public view returns(Notification[] memory){
        return Notifications[pubkey];
    }
    function GiveAccessFiles(address ownerkey,address recipent,string memory url,string memory _name) public{
        require(checkUser(recipent),"User Not Found");
        for(uint i=0;i<Files[ownerkey].length;i++){
            if(keccak256(abi.encodePacked(Files[ownerkey][i].link)) == keccak256(abi.encodePacked(url))){
                Files[ownerkey][i].access.push(recipent);
                Notifications[recipent].push(Notification({
                    Message:ownerkey,
                    timestamp:block.timestamp,
                    name:_name,
                    link:url                    
                }));
            }
        }
    }
    function RemoveAccessForFiles(address ownerKey,address recipent,string memory url) public{
        uint recipentIndex;
        for(uint i=0;i<Files[ownerKey].length;i++){
            if(keccak256(abi.encodePacked(Files[ownerKey][i].link)) == keccak256(abi.encodePacked(url))){
                for(uint j=0;j<Files[ownerKey][i].access.length;j++){
                    if(recipent == Files[ownerKey][i].access[j]){
                        recipentIndex=j;
                    }
                }
                for(uint k = recipentIndex; k <Files[ownerKey][i].access.length - 1; k++) {
                    Files[ownerKey][i].access[k] = Files[ownerKey][i].access[k+1];
                }
                delete Files[ownerKey][i].access[Files[ownerKey][i].access.length-1];    
                if(Files[ownerKey][i].access.length>0){
                    Files[ownerKey][i].access.pop();
                }
                break;
            }

        }
        for(uint i = 0; i < Notifications[recipent].length; i++) {
            if(keccak256(abi.encodePacked(Notifications[recipent][i].link)) == keccak256(abi.encodePacked(url))) {
                for(uint k = i; k < Notifications[recipent].length - 1; k++) {
                    Notifications[recipent][k] = Notifications[recipent][k + 1];
                }
                delete Notifications[recipent][Notifications[recipent].length - 1];
                if(Notifications[recipent].length > 0) {
                    Notifications[recipent].pop();
                }
                break;
            }
        }
    }
}
