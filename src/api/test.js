import {axiosGet, axiosPost} from './baseApi'
import Config from '@/utils/config';
import qs from 'qs'

export const shareActivityInvite = (params, config) => axiosPost(`/customer/api/index/share/activity/invite/${params}`, '', config);
//
export const shareInviteInvite = (params, config) => axiosPost(`/customer/api/index/share/member/invite/record/${params.code}`, qs.stringify(params.data), config);
// 获取验证码
export const getMsgCode = (params, config) => axiosPost('/customer/api/send/msg', qs.stringify(params), config);
// 注册
export const register = (params, config) => axiosPost(`/customer/api/index/share/activity/invite/register/${params.code}`, qs.stringify(params.data), config);
// 消费者APP注册活动详情接口
export const registerFind = (params, config) => axiosPost(`/customer/api/index/share/activity/spread/${params}`, '', config);


// 测试接口
export const getvertify = (params, config) => axiosPost(`${Config.test}/bankcard/test/vertify`, qs.stringify(params), config);
