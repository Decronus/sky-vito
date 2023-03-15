import axiosInstance from "../axios";
import { auth } from "../axios";

class Queries {
    getCurrentUser() {
        return axiosInstance.get("user", { headers: auth() });
    }

    getAdsComments(id) {
        return axiosInstance.get(`ads/${id}/comments`);
    }

    patchCurrentUser(body) {
        return axiosInstance.patch("user", body, { headers: auth() });
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

    deleteAdv(id) {
        return axiosInstance.delete(`ads/${id}`, { headers: auth() });
    }

    patchUpdateAdv(id, body) {
        return axiosInstance.patch(`ads/${id}`, body, { headers: auth() });
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Queries();
