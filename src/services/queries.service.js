import axiosInstance from "../axios";

class Queries {
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
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Queries();
