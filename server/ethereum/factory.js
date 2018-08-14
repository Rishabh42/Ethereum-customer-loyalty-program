import web3 from './web3';
import CampaignFactory from './build/Loyalty.json';
let address = null;
export const setAddress = (_address) => {
    address = _address;
}
const getInstance = () => {
    return new web3.eth.Contract(
        JSON.parse(CampaignFactory.interface),
        address|| process.env.ContractAddress
    );
}

export default {getInstance , setAddress}