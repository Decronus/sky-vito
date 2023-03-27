import axiosInstance from "../utils/axios";
import { auth } from "../utils/axios";

class Queries {
    getCurrentUser() {
        return axiosInstance.get("user", { headers: auth() });
    }

    getAdsComments(id) {
        return axiosInstance.get(`ads/${id}/comments`);
    }

    getAllAds() {
        return axiosInstance.get("ads");
    }

    getAdvById(id) {
        return axiosInstance.get(`ads/${id}`);
    }

    getAllUsers() {
        return axiosInstance.get("user/all");
    }

    postCreateAdsComment(id, body) {
        return axiosInstance.post(`ads/${id}/comments`, body, { headers: auth() });
    }

    postRegUser(body) {
        return axiosInstance.post("auth/register", body);
    }

    postLogin(body) {
        return axiosInstance.post("auth/login", body);
    }

    postUpdateTokens(body) {
        return axiosInstance.put("auth/login", body);
    }

    postUploadAvatar(body) {
        return axiosInstance.post("user/avatar", body, {
            headers: Object.assign(auth(), { "Content-type": "multipart/form-data" }),
        });
    }

    postCreateAdv(body) {
        return axiosInstance.post("adstext", body, { headers: auth() });
    }

    postAddImageToAdv(id, body) {
        return axiosInstance.post(`ads/${id}/image`, body, {
            headers: Object.assign(auth(), { "Content-type": "multipart/form-data" }),
        });
    }

    patchCurrentUser(body) {
        return axiosInstance.patch("user", body, { headers: auth() });
    }

    putUpdatePassword(body) {
        return axiosInstance.put("user/password", body, { headers: auth() });
    }

    patchUpdateAdv(id, body) {
        return axiosInstance.patch(`ads/${id}`, body, { headers: auth() });
    }

    deleteAdv(id) {
        return axiosInstance.delete(`ads/${id}`, { headers: auth() });
    }

    deleteImageFromAdv(id, file_url) {
        return axiosInstance.delete(`ads/${id}/image?file_url=${file_url}`, { headers: auth() });
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Queries();
