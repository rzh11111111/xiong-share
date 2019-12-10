// 获取URL参数
export function parseQueryString(url) {
    console.log(url)
    var index = -1,
        str = '',
        arr = [],
        length = 0,
        res = {};
    if (url) {
        // if(url.indexOf('?')!=-1){
        // index = url.indexOf('?');
        str = url.substring(index + 1);
        arr = str.split('&');
        length = arr.length;
        for (var i = 0; i < length; i++) {
            res[arr[i].split('=')[0]] = arr[i].split('=')[1];
        }
    } else {
        res = {};
    }
    return res;
}
export function phonestar(phone) {
    let str2 = phone.substr(0, 3) + "****" + phone.substr(7);
    return str2
}
