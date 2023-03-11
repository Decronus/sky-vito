import axiosInstance from "../axios";

class Queries {
    getCurrentUser() {
        return axiosInstance.get("user");
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
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Queries();
