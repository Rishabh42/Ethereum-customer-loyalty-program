pragma solidity ^ 0.4 .17;
contract Loyalty {
    struct Company {
        string name;
        string id;
    }


    struct Advert {
        string name;
        uint price;
        string id;
    }

    struct User {
        string name;
        string id;
        string[] Ads;
        uint256 balance;
    }

    User[] public usersArr;
    Advert[] public adsArr;
    address public owner;
    Company[] public companiesArr;

    function Loyalty() public {
        owner = msg.sender;
    }

    function getAllCompanies() public view returns(uint) {
        return companiesArr.length;
    }

    function addCompany(string id, string name) public {
        Company memory newCompany = Company({
            id: id,
            name: name
        });
        companiesArr.push(newCompany);
    }

    function addAds(string name, uint price, string id) public {
        Advert memory newAd = Advert({
            name: name,
            price: price,
            id: id
        });
        adsArr.push(newAd);
    }

    function displayAd(uint index) public view returns(string, uint, string) {
        Advert storage a = adsArr[index];
        return (a.name, a.price, a.id);
    }
    function getAllAds() public view returns (uint){
        return adsArr.length;
    }
        function getAllUsers() public view returns (uint){
        return usersArr.length;
    }

    function getCompany(uint index) public view returns(string) {
        Company storage cc = companiesArr[index];
        return (cc.name);
    }



}