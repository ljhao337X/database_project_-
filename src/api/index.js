import request from './request.js';

const api = {
    userLogin(query) {
        return request({
            url: '/user/login',
            method: 'get',
            params: query
        });
    },
    register(query) {
        return request({
            url: '/user/register',
            method: 'get',
            params: query
        });
    },
    getUserInfo(query) {
        return request({
            url: '/user/info',
            method: 'get',
            params: query
        });
    },
    userRename(query) {
        return request({
            url: '/user/rename',
            method: 'get',
            params: query
        });
    },
    uploadAvatar(query) {
        return request({
            url: '/user/avatar',
            method: 'get',
            params: query
        });
    },
    updatePassword(query) {
        return request({
            url: '/user/updatePassword',
            method: 'get',
            params: query
        });
    },
    getMyIdle(query) {
        return request({
            url: '/user/idle',
            method: 'get',
            params: query
        });
    },

    getAllIdle(query) {
        return request({
            url: '/idle/all',
            method: 'get',
            params: query
        });
    },
    findIdleByLabel(query) {
        return request({
            url: '/idle/label',
            method: 'get',
            params: query
        });
    },
    getIdle(query) {
        return request({
            url: '/idle/details',
            method: 'get',
            params: query
        });
    },
    addIdle(query) {
        return request({
            url: '/idle/add',
            method: 'post',
            params: query
        })
    },

    updateIdle(query) {
        return request({
            url: '/idle/update',
            method: 'get',
            params: query
        })
    },

    addOrder(query) {
        return request({
            url: '/order/add',
            method: 'get',
            params: query
        })
    },

    adminLogOut(query) {
        return request({
            url: '/admin',
            method: 'get',
            params: query
        })
    },

}

export default api;