export default class Abstract {
    constructor() {
        this.base = "https://pq1232.herokuapp.com/";

    }

    /**
     * Protected function to handle any error response
     * @param {object} res from an api request
     * @return {object}
     **/
    async _handleError(res) {
        const errorMsgs = {
            401: "You don't have access to this resource.",
            404: "Resource not found.",
            500: "Error retrieving data from API!",
        };

        const requireAuth = ["/login", "/signup"].every(
            (path) => path !== window.location.pathname
        );

        if (res.redirected && res.url.indexOf("/login") !== -1 && requireAuth) {
            window.dispatchEvent(new CustomEvent("sessionExpired"));
            throw new Error("SESSION_EXPIRED");
        }

        if ([200, 201, 202, 204].indexOf(res.status) === -1) {
            let original;
            try {
                original = (await res.json()) || {};
            } catch (e) {
                original = {};
            }
            return {
                error: true,
                msg: original.detail ||
                    original.error ||
                    original.errors ||
                    errorMsgs[res.status] ||
                    errorMsgs[500],
            };
        }

        const contentType = res.headers.get("content-type");
        const isJson =
            contentType &&
            contentType.indexOf("application/json") !== -1 && ["No Content", "Not Found"].indexOf(res.statusText) === -1;
        return isJson ? await res.json() : res;
    }
}