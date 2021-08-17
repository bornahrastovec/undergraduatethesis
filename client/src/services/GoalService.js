import axios from "axios";

const url = "http://localhost:5000/api/goals";


class GoalService {

    /**
     * Get all goals
     * @param {*} userId 
     * @returns Array of goals
     */
    static async GetGoals(userId) {
        try {
            const res = await axios.post(url+'/allgoals', { userId: `${userId}`});
            console.log(res.data.goals);
            return res.data.goals;
        } catch (err) {
            console.log(err);
        }
    }
    static async MarkGoalAsChecked(goalId) {
        try {
            try {
                console.log("Hit mark goal as checked: ", goalId);
                const res = await axios.put(url + '/goal/' + goalId, {finished: true});
                console.log(res);
                return res;
            } catch (error) {
                console.log(err);
            }
    
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
    static NewGoalEntry(how, what, dateOfPlannedAchievment, why, userId) {
        return axios.post(url+'/goal', {
            how,
            what,
            dateOfPlannedAchievment,
            why,
            userId,
        })
    }

}

export default GoalService