const axios = require("axios");

const api = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "X-Auth-API-Key": process.env.API_KEY,
        "X-Auth-Subdomain": process.env.SUB_DOMAIN
    },
});

api.interceptors.request.use(
    (request) => {
        // console.log("Starting Request", request);
        return request;
    },
    function (error) {
        // console.log("REQUEST ERROR", error);
    }
);

api.interceptors.response.use(
    (response) => {
        // console.log("Response:", response);
        return response;
    },
    function (error) {
        console.log("error", error)
        error = error.response.data;
        console.log("RESPONSE ERROR", error);
        let errorMsg = error.message || "";
        if (error.errors && error.errors.message)
            errorMsg = errorMsg + ": " + error.errors.message;
        return Promise.reject(error);
    }
);

module.exports = api;
