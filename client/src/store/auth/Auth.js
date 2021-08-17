import axios from "axios";

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    role: '',
    status: ''
};

const getters = {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.role == 'Admin' ? true : false,
    authState: state => state.status,
    user: state => state.user
};

const actions = {
    async login({ 
        commit 
    }, user) {
        commit('auth_request');
        let res = await axios.post('http://localhost:5000/api/users/login', user);
        if(res.data.success) {
            const token = res.data.token;
            const user = res.data.user;
            const role = res.data.user.role;
            
            localStorage.setItem('token', token);

            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', token, user, role);
        }
        return res;
    },
    async register({
        commit
    }, userData) {
        commit('register_request');
        let res = await axios.post('http://localhost:5000/api/users/register', userData);
        if (res.data.success !== undefined) {
            commit('register_success');
        }
        return res;
    },
    async logout({commit}){
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        return
    },

    async getProfile({commit}) {
        commit('profile_request');
        let res = await axios.get('http://localhost:5000/api/users/profile');
        commit('user_profile', res.data.user);
        return res;
    }
};

const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, token, user, role) {
        state.token = token;
        state.user = user;
        state.role = role;
        state.status = 'success';
    },
    register_request(state) {
        state.status = 'loading'
    },
    register_success(state) {
        state.status = 'success';
    },
    logout(state) {
        state.status = '';
        state.token = '';
        state.user = '';
        state.role = '';
    },
    profile_request(state) {
        state.status = 'loading' 
    },
    user_profile(state, user) {
        state.user = user;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}