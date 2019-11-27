const LOGIN_COOKIE_NAME = 'cf81sessionid'

export function isAuthenticated () {
    return getCookie(LOGIN_COOKIE_NAME)
}

export function authenticateSuccess (token) {
    setCookie(LOGIN_COOKIE_NAME, token)
}

//清空cookies
export function logout () {
    setCookie(LOGIN_COOKIE_NAME, '', 0)
}

//获取cookies
function getCookie (name) {
    let start, end
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(name + '=')
        if (start !== -1) {
            start = start + name.length + 1
            end = document.cookie.indexOf(';', start)
            if (end === -1) {
                end = document.cookie.length
            }
            return unescape(document.cookie.substring(start, end))
        }
    }
    return ''
}

//设置cookies
function setCookie (name, value, expire) {
    let date = new Date()
    date.setDate(date.getDate() + expire)
    document.cookie = name + '=' + value +
        (expire ? ';expires=' + date.toGMTString() : '')+';path=/'
}