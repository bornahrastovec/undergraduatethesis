import axios from "axios";

const url = "http://localhost:5000/api/diary";

class DiaryService {

    /**
     * Get all diary entries
     * @returns Diary entries
     */
    static async getDiaryEntries(id) {
        try {
            const res = await axios.post(url+'/entries', { userId: `${id}`});
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

    static newDiaryEntry(title, description, userId, moodRate) {
        debugger;
        return axios.post(url+'/entry', {
            title,
            description,
            userId,
            moodRate
        })
    }

    /**
     * Delete a diary entry
     * @param {id} id 
     */
    static deleteEntry(id) {
        console.log("Ran delete id: " + id)
        return axios.delete(url+'/entry/'+id);
    }
}

export default DiaryService
