import axios from "axios";

const url = "http://localhost:5000/api/diary";

class DiaryService {

    /**
     * Get all diary entries
     * @returns Diary entries
     */
    static async getDiaryEntries(id) {
        try {
            const res = await axios.post(url + '/entries', { userId: `${id}` });
            console.log(res.data.entries);
            return res.data.entries;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Insert a new diary entry
     * @param {*} title 
     * @param {*} description 
     * @param {*} userId 
     * @param {*} moodRate 
     * @returns 
     */

    static async newDiaryEntry(title, description, userId, moodRate) {
        return axios.post(url + '/entry', {
            title,
            description,
            userId,
            moodRate
        })
    }

    /**
     * Method for updating diary entry
     * @param {*} _id 
     * @param {*} title 
     * @param {*} description 
     * @param {*} userId 
     * @param {*} moodRate 
     * @returns 
     */

    static async updateEntry(_id, title, description, moodRate) {
        console.log("From service: ", _id, title, description, moodRate);
        try {
            const res = await axios.put(url + '/entry/' + _id, {title: title, description: description, moodRate: moodRate});
            console.log(res);
            return res;
        } catch (error) {
            console.log(err);
        }

    }

    /**
     * Delete a diary entry
     * @param {id} id 
     */
    static async deleteEntry(id) {
        console.log("Ran delete id: " + id)
        return axios.delete(url + '/entry/' + id);
    }
}

export default DiaryService
