import axiosInstance from "./axiosinstance";
import { axiosIns } from "./axiosinstance";

export const getService = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.log("error in get", error);
        throw error
    }
}

export const postService = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        console.log("error in post", error);
        throw error
    }
}

export const getApiservice = async (url) => {
    console.log("url", url);
    try {
        const response = await axiosIns.get(url);
        return response.data;
    } catch (error) {
        console.log("Axios Error Details to know ", error.toJSON());
        throw error;
    }
}