import axios from "axios";

const url = "http://localhost:5000/api/diary";


class GoalService {

    /**
     * Get all goals
     * @param {*} userId 
     * @returns Array of goals
     */
    static async GetGoals(userId) {
        try {
            const res = await axios.post(url+'/goals', { userId: `${id}`});
            console.log(res.data.entries);
            return res.data.entries;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Add a new goal
     * @param {*} shortOverview 
     * @param {*} description 
     * @param {*} dateOfPlannedAchievment 
     * @param {*} userId 
     * @returns Entered goal
     */
    static NewGoalEntry(shortOverview, description, dateOfPlannedAchievment, userId) {
        return axios.post(url+'/goal', {
            title,
            description,
            userId,
            moodRate
        })
    }

}