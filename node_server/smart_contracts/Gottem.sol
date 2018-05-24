pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;
contract register {
    struct resturant {
        bytes32 uuid;
        bytes32 email;
        bytes32 username;
        bytes32 password;
        bytes32 phone_number;
        bytes32 physical_address;
        bytes32 website;
        bytes32 business_name;
        uint32 popularity;
    }
    
    // Takes uuid
    mapping(bytes32 => resturant) public resturant_group;
    bytes32[] uuids;
    
    function addResturant(bytes32 uuid, bytes32 email, bytes32 username, bytes32 password, 
    bytes32 phone_number, bytes32 physical_address, bytes32 website, bytes32 business_name) public
    returns (bytes32[8]){
        resturant memory tmp = resturant(uuid, email, username, password, phone_number, 
        physical_address, website, business_name, 0);
        resturant_group[uuid]= tmp;
        uuids.push(tmp.uuid);
        return [resturant_group[uuid].uuid, resturant_group[uuid].email,
        resturant_group[uuid].username,resturant_group[uuid].password,
        resturant_group[uuid].phone_number,resturant_group[uuid].physical_address,
        resturant_group[uuid].website,resturant_group[uuid].business_name];
    }
    
    function deleteResturant(bytes32 uuid) public returns (bool){
        delete resturant_group[uuid];
    }
    
    function makeTransaction(bytes32 uuid) public returns (bool) {
        if (resturant_group[uuid].uuid.length == 0) {
            return false;
        }
        resturant_group[uuid].popularity++;
        
        return true;
    }

    function get(bytes32 uuid) constant public returns(bytes32[8]) {
        return [resturant_group[uuid].uuid, resturant_group[uuid].email,
        resturant_group[uuid].username, resturant_group[uuid].password,
        resturant_group[uuid].phone_number, resturant_group[uuid].physical_address,
        resturant_group[uuid].website, resturant_group[uuid].business_name];
    }
    function getIDs() view public returns(bytes32[]) {
        return uuids;
    }
    
    function testA() view public returns (bytes32) {
        bytes32 uuid = "123";
        return resturant_group[uuid].email;
    }
    function testB() pure public returns(bytes32[]) {
        bytes32[] memory tags = new bytes32[](2);
        tags[0] = "123";
        tags[1] = "234";
        return tags;
    }
    function testC() public view returns(bytes32[8]) {
        bytes32 uuid = 0x313233;
        return [resturant_group[uuid].uuid, resturant_group[uuid].email,
        resturant_group[uuid].username, resturant_group[uuid].password,
        resturant_group[uuid].phone_number, resturant_group[uuid].physical_address,
        resturant_group[uuid].website, resturant_group[uuid].business_name];
    }
}



curl -d '{"email":"whitecastle@gmail.com", "username":"whitecastle", "password":"beefpatty123", "phone_number":"123143153", "physical_address":"16 win ave", "website":"whitecastle.com", "business_name":"white castle"}' http://localhost:8080/register


curl -d '{"email":"mcdonalds@gmail.com", "username":"mcdonalds", "password":"beatty123", "phone_number":"123123153", "physical_address":"262 Canal St", "website":"mcdonalds.com", "business_name":"Mc Donalds"}' http://localhost:8080/register


curl -d '{"email":"wendys@gmail.com", "username":"wendez", "password":"bweny123", "phone_number":"(212) 674-5404", "physical_address":"650 Broadway, New York, NY 10012", "website":"wendys.com", "business_name":"Wendys"}' http://localhost:8080/register


curl -d '{"email":"frankie@gmail.com", "username":"frankies", "password":"frank123", "phone_number":"2122447444", "physical_address":"1367 Broadway, NY 10018", "website":"www.frankieboy.com", "business_name":"Frankie Boys Pizza"}' http://localhost:8080/register


