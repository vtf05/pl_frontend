import Abstract from "./abstract";

export default class Cart extends Abstract {
    constructor() {
        super();
        this.endpoint = `${this.base}api/v1/cart/cart/`;
    }

    /**
     * Helper to load the list of posts
     * @returns {object} response
     */

    async getList(user) {
        // console.log(
        //     "request will be made and the value of access_token is ",
        //     this.accessToken
        // );
        const accessToken = localStorage.getItem("access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(`${this.endpoint}?user__id=${user}`, {
            headers: {
                Authorization: `Token ${accessToken}`,
            },
        });

        return this._handleError(res);
    }

    async getFilterList() {
        // console.log(
        //     "request will be made and the value of access_token is ",
        //     this.accessToken
        // );
        const accessToken = localStorage.getItem("access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(`${this.endpoint}?get_cart`, {
            headers: {
                Authorization: `Token ${accessToken}`,
            },
        });

        return this._handleError(res);
    }

    async add_item(cart_id, item_id) {
        const accessToken = localStorage.getItem("access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(`${this.endpoint}add_item/?cart_id=${cart_id}&item_id=${item_id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${accessToken}`,
            },
            method: "POST",
            body: "",
        });
        return this._handleError(res);
    }
}