const compiledFactory = require('./build/Loyalty.json');
// const factory  = require('./factory');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
    )
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '3000000', from: accounts[0] });
    console.log('Contract deployed to', result.options.address);
    // factory.setAddress(result.options.address);
    return result.options.address;
};
deploy().then(x => {
    debugger;
    console.log(x);

}).catch(e => {
    debugger;
    console.log(e);
});
