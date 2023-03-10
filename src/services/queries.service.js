import axiosInstance from "../axios";

class Queries {
    getAllAdv() {
        return axiosInstance.get("ads");
    }

    getAdvById(id) {
        return axiosInstance.get(`ads/${id}`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Queries();
