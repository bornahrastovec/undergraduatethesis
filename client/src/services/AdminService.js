import axios from "axios";

const url = "http://localhost:5000/api/admin";

class AdminService {

    /**
     * Get all diary entries
     * @returns Diary entries
     */
    static async getAllUsers() {
        try {
            const res = await axios.get(url+'/users');
            console.log(res.data);
            return res.data;
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

    static deleteUser(id) {
        debugger;
        return axios.post(url+'/users/delete', {
            id
        })
    }

    /**
     * Delete a diary entry
     * @param {id} id 
     */
    static makeAdmin(id) {
        console.log("Ran make admin " + id)
        return axios.delete(url+'/users/makeadmin', {
            id
        });
    }
}

export default AdminService
