import Vue from 'vue';
import axios from 'axios';
import Config from '@/utils/config';
import {Toast} from 'vant';
import returnMsg from './returnMsg';
import 'vant/lib/index.css'

Vue.use(Toast);
// 多环境配制
let host = ''
if (process.env.NODE_ENV == 'development') { // 本地
    host = Config.devhost
    // host = "http://192.168.0.116:8080/"
} else if (process.env.NODE_ENV == 'production') {
    if (process.env.VUE_APP_FLAG === 'pro') {
        //production 生产环境
        host = Config.prohost
    } else if (process.env.VUE_APP_FLAG === 'sit') {
        //test 预发布
        host = Config.sithost
    } else if (process.env.VUE_APP_FLAG === 'test') {
        //test 测试环境
        host = Config.testhost
    }
}
let AxiosIns = axios.create({
    baseURL: host,
    timeout: 300000,
    ContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    // withCredentials: true // axios 默认不发送cookie，跨域也是一个原因，需要全局设置
})

let timer = [];
let delay = 300;
AxiosIns.interceptors.request.use(config => {
    // config.headers.tokenId = sessionStorage.$getSessionStorageByName('tokenId')
    if (navigator.onLine == false) {
        Toast('当前未连接网络，连接网络后请刷新页面')
    } else {
        if (config.showFullLoading !== 'close') {
            timer.push(setTimeout(() => {
                //添加菊花
                Toast.loading({
                    mask: true,
                    message: '加载中...'
                });
            }, delay))
        }
        return config;
    }
}, function (error) {
    return Promise.reject(error);
});

AxiosIns.interceptors.response.use(response => {
    for (let t of timer) {
        clearTimeout(t);
    }
    //请求结束 清除菊花
    Toast.clear();
    try {
        if (response.data) {
            let resData = response.data
            if (resData.status !== 1) {
                // 15150597200
                if (resData.status === 11905) {
                    Toast('手机号未注册！')
                    return
                }
                if (resData.status === 11900) {
                    return resData
                }
                if (resData.status === 40003) {
                    return resData
                }
                Toast(resData.stateMessage ? resData.stateMessage : returnMsg[resData.status])
                return false
            }
            return resData
            /**
             * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
             * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
             */
            //     if (res.code !== 20000) {
            //       Message({
            //         message: res.message,
            //         type: 'error',
            //         duration: 5 * 1000
            //       });
            //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            //           confirmButtonText: '重新登录',
            //           cancelButtonText: '取消',
            //           type: 'warning'
            //         }).then(() => {
            //           store.dispatch('FedLogOut').then(() => {
            //             location.reload();// 为了重新实例化vue-router对象 避免bug
            //           });
            //         })
            //       }
            //       return Promise.reject('error');
            //     }
        }
    } catch (error) {
        // console.log(error)
    }
}, (error) => {
    for (let t of timer) {
        clearTimeout(t);
    }
    //关闭菊花
    Toast.clear();
    Toast('可能无网络或接口请求错误')
    try {
        if (error.response) {
            Toast.clear();
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        Toast('请求错误！');
                        break
                    // case 401:
                    //     Toast({
                    //         mes: '登录失效,请重新登录！',
                    //         timeout: 1000
                    //     });
                    case 403:
                        Toast('拒绝访问！');
                        break
                    case 404:
                        Toast(`请求地址出错: ${error.response.config.url}`);
                        break
                    case 500:
                        Toast('服务器内部错误！');
                        break
                    default:
                }
            }
        }
    } catch (e) {
        Toast(e);
    }
    return Promise.reject(error);
})
export default AxiosIns;
