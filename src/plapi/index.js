import User from "./user";
import Item from "./item"
import Cart from "./cart"
import Wallet from "./wallet"

const Plapi = {
    User: new User(),
    Item: new Item(),
    Cart: new Cart(),
    Wallet: new Wallet(),
};
export default Plapi;