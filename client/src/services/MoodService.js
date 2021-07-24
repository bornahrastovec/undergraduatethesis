import axios from "axios";

const url = "http://localhost:5000/api/mood";

class MoodService {

    /**
     * Gets all user entered moods
     * @param {*} userId 
     * @returns Array of moods
     */
    static async GetAllMoods(userId) {
        try {
            const res = await axios.post(url+'/allmoods', { userId: `${userId}`});
            return res.data.mood;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Makes a new mood :)
     * @param {*} userId 
     * @returns 
     */
    static async NewMood(userId, mood, description) {
        try {
           return axios.post(url+'/mood', {
                userId,
                mood,
                description
            });
        } catch (err) {
            console.log(err);
        }
    }

}

export default MoodService