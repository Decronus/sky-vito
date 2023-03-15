import Queries from "../services/queries.service";

class LoaderFunctions {
    async getAllAds() {
        const ads = await Queries.getAllAds();
        return ads.data;
    }

    async getUserAds(id) {
        const allAds = await Queries.getAllAds();
        const userAds = allAds.data.filter((el) => {
            return el.user_id === Number(id);
        });

        return userAds;
    }

    async getAdvById(id) {
        const adv = await Queries.getAdvById(id);

        return adv.data;
    }

    async getUser(id) {
        const allUsers = await Queries.getAllUsers();
        const user = allUsers.data.find((el) => {
            return el.id === Number(id);
        });

        if (!user) throw new Error("User is not exists");

        return user;
    }

    async getUserAndUserAds(id) {
        const userAds = await this.getUserAds(id);
        const user = await this.getUser(id);

        return [userAds, user];
    }

    async getAdsComments(id) {
        const comments = await Queries.getAdsComments(id);

        return comments.data;
    }

    async getAdvAndComments(id) {
        const adv = await this.getAdvById(id);
        const comments = await this.getAdsComments(id);

        return [adv, comments];
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LoaderFunctions();
