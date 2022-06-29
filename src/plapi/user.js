import Abstract from "./abstract";


export default class User extends Abstract {
    constructor() {
        super();
        this.endpoint = `${this.base}`;
    }

    /**
     * Hit
     * @param {Number} userId
     * @returns
     **/

    async getDetail(userId) {
        const accessToken = localStorage.getItem("pl_access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(`${this.endpoint}api/v1/users/user/${userId}/`, {
            headers: {
                Authorization: `Token ${accessToken}`,
            },
        });
        return this._handleError(res);
    }

    /**
     * Hit endpoint {this.endpoint/user} POST
     * @param {*} param0
     * @returns
     */
    async create(data) {
        const res = await fetch(`${this.endpoint}/register/`, {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        const response = await res.json();
        console.log("the response of user creation", response);
        const re = this._handleError(response);
        // console.log(re);
        return re;
        // return appropirate response
        // return this._handleError(res);
    }

    async getList() {
        const res = await fetch(`${this.endpoint}/user`, {
            headers: {
                Authorization: `Token ${this.accessToken}`,
            },
        });
        const users = await res.json();
        return users;
    }

    /**
     *
     * @param {object}
     * id of the user we want to get the info about
     * @returns
     */
    async get(mobile) {
        const accessToken = localStorage.getItem("pl_access_token");
        const res = await fetch(`${this.endpoint}api/v1/users/user/?mobile=${mobile}`, {
            headers: {
                Authorization: `Token ${accessToken}`,
            },
        });
        const user = await res.json();
        // Handle the api call in case there is some error.
        return user;
    }

    async update(userId, obj) {
        const accessToken = localStorage.getItem("pl_access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(
            `${this.endpoint}api/v1/users/user/${userId}/`, {
                headers: {
                    // "Content-Type": "multipart/form-data;  boundary=''",
                    Authorization: `Token ${accessToken}`,
                },
                method: "PATCH",
                body: obj,
                redirect: "follow",
            }
        );
        return this._handleError(res);
    }

    async getOtp(number) {
        // console.log(this.clientId, this.clientSecret, data.username, data.password);
        try {
            // POST request with username, password and client id and secret.
            // curl - X POST - d "grant_type=password&username=test&password=test" - u "K45EkxJ27zaZAok3quoF9vQ8rRxfdVGwvBqcEsev:panX8DOlk4gt7TwXLyU8uvQadxEhRpv5ngRS7jCd0dNFx0ccGnoERPVAcjfnnUTGMhcNcUIk9Gk2EtcY1tWGQG1IiPwR35bBU5kmPiQ4ZZFwGLTMg7kJIa2Yefo96jMC"

            var urlencoded = new URLSearchParams();
            urlencoded.append("mobile", `+91${number}`);
            const res = await fetch(`${this.endpoint}auth/mobile/`, {
                // body: `grant_type=password&username=${data.username}&password=${data.password}`,
                body: urlencoded,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST",
            });
            console.log("this is the response ", res)

            return this._handleError(res);
        } catch (error) {
            return { error: "ERROR: While fetching the access token" };
        }
    }

    async sendOtp(otp) {
        // console.log(this.clientId, this.clientSecret, data.username, data.password);
        try {
            // POST request with username, password and client id and secret.
            // curl - X POST - d "grant_type=password&username=test&password=test" - u "K45EkxJ27zaZAok3quoF9vQ8rRxfdVGwvBqcEsev:panX8DOlk4gt7TwXLyU8uvQadxEhRpv5ngRS7jCd0dNFx0ccGnoERPVAcjfnnUTGMhcNcUIk9Gk2EtcY1tWGQG1IiPwR35bBU5kmPiQ4ZZFwGLTMg7kJIa2Yefo96jMC"
            const number = window.localStorage.getItem("number");
            var urlencoded = new URLSearchParams();
            urlencoded.append("mobile", `+91${number}`);
            urlencoded.append("token", `${otp}`);
            const res = await fetch(`${this.endpoint}auth/token/`, {
                // body: `grant_type=password&username=${data.username}&password=${data.password}`,
                body: urlencoded,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST",
            });

            return this._handleError(res);

        } catch (error) {
            return { error: "ERROR: While fetching the access token" };
        }
    }

    /**
     * Helper to logout the user
     */
    async logout() {
        if (localStorage.getItem("pl_access_token")) {
            const accessToken = localStorage.getItem("pl_access_token");
            // revoke the token
            window.localStorage.removeItem("pl_access_token");
            const endpoint = this.base.concat("o/revoke_token/");
            const res = await fetch(endpoint, {
                body: `token=${accessToken}&client_id=${this.clientId}&client_secret=${this.clientSecret}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST",
            });
            return this._handleError(res);
        }
    }

    async userFollow(obj) {
        const endpoint = this.endpoint.concat("/user_follow/");
        const accessToken = localStorage.getItem("pl_access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            body: JSON.stringify(obj),
        });
        return this._handleError(res);
    }

    async getFollower(userId) {
        const endpoint = this.endpoint.concat(`/user_follow/?user=${userId}/`);

        const accessToken = localStorage.getItem("pl_access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return this._handleError(res);
    }

    async search(keyword) {
        const endpoint = `${this.endpoint}/user/?search=${keyword}`;
        const accessToken = localStorage.getItem("pl_access_token") || {}; // this is getting repeated every where find a solution.
        const res = await fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
        });
        return this._handleError(res);
    }
}