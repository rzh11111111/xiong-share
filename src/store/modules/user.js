import {getToken, removeToken} from '@/utils/auth'
import sessionStorage from '../sessionStorage'

const user = {
    state: {
        accountId: '',
        accountType: '',
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        },
        userId: ''
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_USERID: (state, userId) => {
            state.accountId = userId
        },
        SET_TYPE: (state, type) => {
            state.accountType = type
        }
    },

    actions: {
        // 用户名登录
        loginByStore({commit, rootState}, userInfo) {
            userInfo.username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                // api.testApi.loginByStore(userInfo).then(res => {
                //     if (res.data.status === 1) {
                //         console.log('aaaaa', res.data.data)
                //         sessionStorage.$setSessionStorageByName('id', res.data.data.id)
                //         sessionStorage.$setSessionStorageByName('accountId', res.data.data.accountId)
                //         sessionStorage.$setSessionStorageByName('accountType', res.data.data.accountType)
                //         // commit('SET_TYPE', res.data.data.accountType)
                //         // commit('SET_USERID', res.data.data.accountId)
                //     }
                //     // commit('SET_TOKEN', res.data.phone)
                //     // commit('SET_NAME', res.data.data.name)
                //     // commit('SET_INTRODUCTION', res.data.data.phone)
                //     // commit('SET_CODE', res.data.data.code)
                //     // setToken(res.data.phone)
                //     resolve(res.data)
                // }).catch(error => {
                //     console.log('cuowu')
                //     reject(error)
                // })
            })
        },
        loginByMerchant({commit, rootState}, userInfo) {
            userInfo.username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                // api.testApi.loginByMerchant(userInfo).then(res => {
                //     if (res.data.status === 1) {
                //         sessionStorage.$setSessionStorageByName('id', res.data.data.id)
                //         sessionStorage.$setSessionStorageByName('accountId', res.data.data.accountId)
                //         sessionStorage.$setSessionStorageByName('accountType', res.data.data.accountType)
                //         // commit('SET_TYPE', res.data.data.accountType)
                //         // commit('SET_USERID', res.data.data.accountId)
                //     } else {
                //
                //     }
                //     // setToken(res.data.phone)
                //     resolve(res.data)
                // }).catch(error => {
                //     reject(error)
                // })
            })
        },
        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                // api.testApi.logout().then(res => {
                //     commit('SET_TOKEN', '')
                //     commit('SET_ROLES', [])
                //     removeToken()
                //     resolve()
                // }).catch(error => {
                //     reject(error)
                // })
            })
        }

        // 前端登出
        // FedLogOut ({commit}) {
        //   return new Promise(resolve => {
        //     commit('SET_TOKEN', '')
        //     removeToken()
        //     resolve()
        //   })
        // }
    }
}

export default user
