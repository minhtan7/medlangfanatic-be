const axios = require("axios");
const { AppError } = require("./helpers/utils.helper");

const apiThinkific = axios.create({
    baseURL: process.env.BASE_URL_THINKIFIC,
    headers: {
        "Content-Type": "application/json",
        "X-Auth-API-Key": process.env.API_KEY,
        "X-Auth-Subdomain": process.env.SUB_DOMAIN
    },
});

apiThinkific.interceptors.request.use(
    (request) => {
        // console.log("Starting Request", request);
        return request;
    },
    function (error) {
        // console.log("REQUEST ERROR", error);
    }
);

apiThinkific.interceptors.response.use(
    (response) => {
        // console.log("Response:", response);
        return response;
    },
    function (error) {
        // console.log("error", error)
        error = error.response.data;
        console.log("RESPONSE ERROR", error);
        let errorMsg = error.error || "";
        throw new AppError(404, error);
        // if (error.errors && error.errors.message)
        //     errorMsg = errorMsg + ": " + error.errors.message;
        return Promise.reject(error);
    }
);

const apiWP = axios.create({
    baseURL: process.env.BASE_URL_WP,
    headers: {
        "Content-Type": "application/json",
    },
});

apiWP.interceptors.request.use(
    (request) => {
        console.log("Starting Request", request);
        return request;
    },
    function (error) {
        // console.log("REQUEST ERROR", error);
    }
);

apiWP.interceptors.response.use(
    (response) => {
        console.log("Response:", response);
        return response;
    },
    function (error) {
        console.log("error", error)
        // error = error.response.data;
        // console.log("RESPONSE ERROR", error);
        // let errorMsg = error.message || "";
        // if (error.errors && error.errors.message)
        //     errorMsg = errorMsg + ": " + error.errors.message;
        // return Promise.reject(error);
    }
);

module.exports = { apiThinkific, apiWP };
