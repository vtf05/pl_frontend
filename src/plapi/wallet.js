import Abstract from "./abstract";

export default class Wallet extends Abstract {
    constructor() {
        super();
        // this.endpoint = "http://localhost:8000/api/v1/wallet/user_wallet/";
        this.endpoint = `${this.base}api/v1/wallet/user_wallet/`;
    }

    /**
     * Helper to load the list of posts
     * @returns {object} response
     */
    async getDetail(userId) {
        // console.log(
        //     "request will be made and the value of access_token is ",
        //     this.accessToken
        // );
        const accessToken = localStorage.getItem("access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(`${this.endpoint}?user__id=${userId}`, {
            headers: {
                Authorization: `Token ${accessToken}`,
            },
        });
        return this._handleError(res);
    }
    async getTransaction(userId) {
        // console.log(
        //     "request will be made and the value of access_token is ",
        //     this.accessToken
        // );
        const accessToken = localStorage.getItem("access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(`${this.base}api/v1/wallet/transaction/?user__id=${userId}`, {
            headers: {
                Authorization: `Token ${accessToken}`,
            },
        });
        return this._handleError(res);
    }
    async handlePaymentSuccess(obj) {
        const bodyData = { response: obj };
        // we will send the response we've got from razorpay to the backend to validate the payment

        const endpoint = "http://localhost:8000/api/v1/wallet/payment/success/";
        const accessToken = localStorage.getItem("access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${accessToken}`,
            },
            method: "POST",
            body: JSON.stringify(bodyData),
        });
        return this._handleError(res);
    }

    async makePayment(obj, response) {
        // console.log(obj.ammount, obj)
        const endpoint = "http://localhost:8000/api/v1/wallet/pay/";
        const accessToken = localStorage.getItem("access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${accessToken}`,
            },
            method: "POST",
            body: JSON.stringify(obj),
        }).then((response) => {
            return response;
        });
        return this._handleError(res);
    }
}