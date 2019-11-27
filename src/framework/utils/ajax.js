import 'whatwg-fetch'
import {message,notification } from 'antd'
import appStore from '../../stores/AppStore'
import * as Session from "./Session";
import history from "../customHistory";

const error = {status: 0, msg: '网络错误'}
const loginError = {status: 0, msg: '登陆错误'}

const config=require(`@/project/config`).default
export const companyId = config.companyId



/**当接口401时，消息提醒**/
const close = async() => {
    history.push('/login')
    await Session.logout()
};
const openNotification = (mes) => {
    notification.warning({
        message: mes,
        onClose:close
    });
};

const notificationErr=(errStatus)=>{
    if(errStatus === '1'){
        openNotification('当前用户已在其他地方登录')
    }
    if(errStatus === '0'){
        openNotification('登录超时，请重新登录')
    }
}

let globalStatus = ''
export async function get(url, param) {
  try {
    const response = await fetch(`${config.apiUrl}/${url}?${_encodeParam(param)}`, {
      credentials: 'include',
    })
    const result = await response.json()
      if(response.status === 500){
          if(result.data){
              message.warning(`错误(${result.data})`)
          }else {
              message.warning(`错误`)
          }
      }
    if (response.status >= 400) {
      if (parseInt(result.code)>2000) {
        message.warning(result.msg)
      }
      if (response.status === 401) {
          globalStatus += response.headers.get("userstatus")
          if(globalStatus==='1'){
              notificationErr(response.headers.get("userstatus"))
          }
          history.push('/login')
        return loginError
      }
      return error
    }
    return result

  } catch (err) {
    return error
  }
}

export async function post(url, param) {
  try {
    const response = await fetch(`${config.apiUrl}/${url}`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: _encodeParam(param),
    })
    const result = await response.json()
      if(response.status === 500){
          if(result.data){
              message.warning(`错误(${result.data})`)
          }else {
              message.warning(`错误`)
          }
      }
    if (response.status >= 400) {
      if (parseInt(result.code)>2000) {
        message.warning(result.msg)
      }
      if (response.status === 401) {
          globalStatus += response.headers.get("userstatus")
          if(globalStatus ==='1'){
              notificationErr(response.headers.get("userstatus"))
          }
          history.push('/login')
        return loginError
      }
      return error
    }
    return result
  } catch (err) {
    return error
  }
}

async function _json(url, json, method) {
  try {
    const response = await fetch(`${config.apiUrl}/${url}`, {
      credentials: 'include',
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(json),
    })
    const result = await response.json()
      if(response.status === 500){
          if(result.data){
              message.warning(`错误(${result.data})`)
          }else {
              message.warning(`错误`)
          }
      }
    if (response.status >= 400) {
      if (parseInt(result.code)>2000) {
        message.warning(result.msg)
      }
      if (response.status === 401) {
        await appStore.logout()
          return loginError
      }
      return error
    }
    return result
  } catch (err) {
      console.log(err)
    return error
  }
}

export const json = {
  get: async function (url, param) {
    return get(url, param)
  },
  post: async function (url, json) {
    return _json(url, json, 'POST')
  },
  put: async function (url, json) {
    return _json(url, json, 'POST')
  },
  delete: async function (url) {
    return _json(url, {}, 'POST')
  },
  batchDelete: async function (url, json) {
    return _json(url, json, 'POST')
  },
  isError: function (res) {
    if (res && res.status === 0) {
      return true
    }
    return false
  }
}

//将url进行 & 拼接
export function _encodeParam(param) {
  const obj = {...param, companyId}
  return Object.keys(obj)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key] ? obj[key] : '')}`)
      .join('&')
}


//url判断是否有？
const judgeURL = (url, param) =>{
    if(url.indexOf("?") === -1){
        url = `${url}?${_encodeParam(param)}`
    }else {
        url =  `${url}&${_encodeParam(param)}`
    }
    return url;
}

