pragma solidity ^ 0.4 .17;
contract Loyalty {
    address public owner;
    Company[] public companiesArr;
    Ads[] public allAds;
    mapping(uint => User) public users;
    struct Company {
        string name;
        string id;
        uint uId;
    }
    struct User {
        string name;
        uint uId;
        uint parentId;
        mapping(uint=>uint) balances;
    }
    struct Ads{
        uint coin;
        string text;
        uint aId;
        uint cId;
    }

    function Loyalty() public {
        owner = msg.sender;
    }
    function getAllCompanies() public constant returns(uint) {
        return companiesArr.length;
    }
    function addCompany(string id, string name) public {
        Company memory newCompany = Company({
            id: id,
            name: name,
            uId: companiesArr.length
        });
        companiesArr.push(newCompany);
    }
    function getCompany(uint index) public view returns(string) {
        Company storage cc = companiesArr[index];
        return (cc.name);
    }
    function addUser(uint uId, string name, uint cId, uint bal) public {
        User memory newUser = User({
            name: name,
            uId: uId,
            parentId: cId
        });
        users[uId] = newUser;
        addUserBal(uId, cId, bal);
    }
    function addUserBal(uint uId, uint cId, uint bal) public {
        User storage _user = users[uId];
        _user.balances[cId] = bal;
    }
    function getUser(uint id, uint cId) public view returns(uint, string, uint){
        User storage uu = users[id];
        return(uu.uId, uu.name, uu.balances[cId]);
    }
    function totalAds() public view returns(uint) {
        return allAds.length;
    }
    function createAd(uint coins, string text, uint cId) public{
        uint _aId = allAds.length;
        Ads memory _ad = Ads({
            coin: coins,
            text: text,
            aId: _aId,
            cId: cId
        });
        allAds.push(_ad);
    }
    function displayAd(uint index) public view returns(uint, string) {
        Ads storage currentAd = allAds[index];
        return (currentAd.aId, currentAd.text);
    }
    
    function redeemAd(uint aId, uint uId) public restricted{
        Ads memory currentAd = allAds[aId];
        User storage currentuser = users[uId];
        require(currentuser.balances[currentAd.cId]> currentAd.coin);
        currentuser.balances[currentAd.cId] = currentuser.balances[currentAd.cId]- currentAd.coin;
    }
    
    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

}
