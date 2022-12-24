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
    getMyBuying(query) {
        return request({
            url: '/user/buying',
            method: 'get',
            params: query
        });
    },
    searchIdle(query) {
        return request({
            url: '/idle/search',
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
    //------------以下为order相关接口------------
    addOrder(query) {
        return request({
            url: '/order/add',
            method: 'get',
            params: query
        })
    },
    updateOrderStatus(query) {
        return request({
            url: '/order/updateStatus',
            method: 'get',
            params: query
        })
    },
    getOrder(query) {
        return request({
            url: '/order/get',
            method: 'get',
            params: query
        })
    },
    getOrderByIdle(query) {
        return request({
            url: '/order/findByIdleId',
            method: 'get',
            params: query
        })
    },
    updateOrderComment(query){
        return request({
            url: '/order/updateComment',
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

    // 以下为管理员使用的接口
    findIdleByState(query) {
        return request({
            url: '/idle/status',
            method: 'get',
            params: query
        });
    },
    findOrder(query) {
        return request({
            url: '/order/getByPage',
            method: 'get',
            params: query
        });
    },
    deleteAnOrder(query) {
        return request({
            url: '/order/delete',
            method: 'get',
            params: query
        });
    },
    findUser(query) {
        return request({
            url: '/user/getByPage',
            method: 'get',
            params: query
        });
    },
    updateUserStatus(query) {   // 修改用户的状态，是不是被封禁的
        return request({
            url: '/user/updateStatus',
            method: 'get',
            params: query
        });
    }


}

export default api;