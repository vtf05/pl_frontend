import Abstract from "./abstract";

export default class Item extends Abstract {
    constructor() {
        super();
        this.endpoint = `${this.base}api/v1/cart/item/`;
    }

    /**
     * Helper to load the list of posts
     * @returns {object} response
     */
    async getList() {
        // console.log(
        //     "request will be made and the value of pl_access_token is ",
        //     this.accessToken
        // );

        const accessToken = localStorage.getItem("pl_access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(`${this.endpoint}`, {
            headers: {
                Authorization: `Token ${accessToken}`,
            },
        });
        return this._handleError(res);
    }

    // async create(obj) {
    //     const accessToken = localStorage.getItem("pl_access_token") || {}; // this is getting repeated every where find a solution.
    //     const res = await fetch(this.endpoint, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //         method: "POST",
    //         body: JSON.stringify(obj),
    //     });
    //     return this._handleError(res);
    // }
}