import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://my-app-netflix.herokuapp.com/api/"
}) 