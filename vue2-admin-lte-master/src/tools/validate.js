export const email = function (val) {
    if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(val)) {
        return true
    } else {
        return false
    }
}
export const mobile = function (val) {
    if (!/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(val)) {
        return true
    } else {
        return false
    }
}
export const password = function (val) {
    if (!/^[a-zA-Z0-9_!@#$%^&*.,-=+?<>]{6,20}$/.test(val)) {
        return true
    } else {
        return false
    }
}
export const username = function (val) {
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(val)) {
        return true
    } else {
        return false
    }
}
export const ip = function (val) {
    if (!/^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3,5}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/.test(val)) {
        return true
    } else {
        return false
    }
}
export const mac = function (val) {
    if (!/^[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}$/.test(val)) {
        return true
    } else {
        return false
    }
}
export const tel = function (val) {
    if (!/^(0[0-9]{2,3}-)?[0-9]{5,8}$/.test(val)) {
        return true
    } else {
        return false
    }
}
export default {
    email,
    mobile,
    tel,
    password,
    username,
    ip,
    mac
}
