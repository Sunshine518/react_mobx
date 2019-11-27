import {Form} from 'antd'
import  * as CryptoJS from 'crypto-js'
import {isAuthenticated} from './Session'

const config=require(`@/project/config`).default
export const companyId = config.companyId

/**
 * 多条件分页，固定分页数量
 * @param temPage
 * @param pagination
 * @param searchFields
 * @returns {{}}
 */
export const handleSeerchAndPage = (temPage, pagination, searchFields) => {
    if (temPage) {
        temPage--
    } else if (pagination.page) {
        temPage = pagination.page - 1
    } else {
        temPage = 0
    }
    // 构建查询参数
    let search = {}
    Object.keys(searchFields).forEach(key => {
        search[`search.${key}`] = searchFields[key].value ? searchFields[key].value : ((searchFields[key]+'') ? (searchFields[key]+'') : '')
    })
    search.page = temPage
    search.size = 10
    return search
}


/**
 * 多条件分页、动态分页数据
 * @param temPage
 * @param pagination
 * @param searchFields
 * @returns {{}}
 */
export const handleSearchAndPage = (temPage, pagination, searchFields) => {
    if (temPage) {
        temPage--
    } else if (pagination.page) {
        temPage = pagination.page - 1
    } else {
        temPage = 0
    }
    // 构建查询参数
    let search = {}
    Object.keys(searchFields).forEach(key => {
        search[`search.${key}`] = searchFields[key].value ? searchFields[key].value : ((searchFields[key]+'') ? (searchFields[key]+'') : '')
    })
    search.page = temPage
    search.size = pagination.pageSize
    return search
}

/**
 * 构造后台Map
 * @param pram
 * @returns {{}}
 */
export const searchMap = (param) => {
    let search = {}
    Object.keys(param).forEach(key => {
        search[`search.${key}`] = param[key].value ? param[key].value : (param[key] ? param[key] : '')
    })
    return search
}

/**
 * 查询search
 * @param pram
 * @returns {{}}
 */
export const searchs = (param) => {
    let search = {}
    Object.keys(param).forEach(key => {
        search[`search.${key}`] = param[key] ? param[key] : ''
    })
    return search
}

/**
 * 平行tree结构取ids
 * @param node
 * @returns {Array}
 */
export const getTreeIds = (node) => {
    let ids = []
    for (let i = 0; i < node.length; i++) {
        ids.push(node[i].id.toString())
        ids = ids.concat(getTreeIds(node[i].children))
    }
    return ids
}

/**
 * {xxx：123} to {xxx:{value:123}}
 * @param obj
 * @returns {{}}
 */
export const objToValueObj = (obj) => {
    let target = {}
    Object.keys(obj).forEach(key => {
        target[`${key}`] = {value: obj[`${key}`]}
    })
    return target
}

/**
 * {xxx:{value:123}} to {xxx：123}
 * @param obj
 * @returns {{}}
 * @constructor
 */
export const valueObjToObj = (obj) => {
    let target = {}
    Object.keys(obj).forEach(key => {
        target[`${key}`] = obj[`${key}`].value
    })
    return target
}

/**
 * 将属性转化为表单可用属性
 * @param obj
 * @returns {{}}
 */
export const objToForm = (obj) => {
    let target = {}
    Object.keys(obj).forEach(key => {
        target[`${key}`] = Form.createFormField({value: obj[`${key}`]})
    })
    return target
}

/**清空表单**/
export const clearForm = (obj) => {
    let target = {}
    Object.keys(obj).forEach(key => {
        target[key] =''
    })
    return target
}

/**
 * 答疑中心主题回复将回复的树转换为一个列表
 * 创建一个list，通过递归将children的值push到list数组中
 * @param arr,arr
 * @returns
 */
export function getReplyList(children, list, commented) {
    if (!Array.isArray(children)) {
        return
    }
    children.forEach(item => {
        const obj = {...item, commented: commented}
        list.push(obj)
        getReplyList(item.children, list, item.senderUserName)
    })
}

/**
 * 将对象转换为键值对拼接到url里
 */
export function query(data) {
    let queryStr = '';
    for (let [key, value] of Object.entries(data)) {
        if (value === undefined) {
            continue
        }
        queryStr += `&search.${key}=${value}`;
    }
    return queryStr ? queryStr.substring(1) : '';
}

/**
 * 查询参数对象属性添加search
 * @param obj
 * @returns {{}}
 */
export function formatParams(obj){
    let params = {}
    for(let [key,value] of Object.entries(obj)){
        if(value){
            params[`search.${key}`] = value
        }
    }
    return params
}

/**
 * 查询参数search形式.（search.xxx）
 * @param searchFields
 * @returns {string}
 * @private
 */
export function _encodeParamToSearch(searchFields ={}) {
    // 构建查询参数
    let search = {}
    Object.keys(searchFields).forEach(key => {
        if (searchFields[key]) {
            search[`search.${key}`] = searchFields[key].value ? searchFields[key].value : ((searchFields[key] + '') ? (searchFields[key] + '') : '')
        }
    })
    const obj = {...search, companyId}
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key] ? obj[key] : '')}`)
        .join('&')
}

/**
 * *@data:字符串 *@key:字符串或byte[]
 * */
export function AESEncrypt(data,key) {
    let AES_KEY = CryptoJS.enc.Utf8.parse(key);
    let sendData = CryptoJS.enc.Utf8.parse(data);
    let encrypted = CryptoJS.AES.encrypt(sendData, AES_KEY,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * 设置store对象，类似react的setState
 * @param obj
 */
export function setStore(obj,that)  {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        for (let [key, value] of Object.entries(obj)) {
            that[key] = value
        }
    }
}

/**
 * store回显到表单的处理（包括error）
 * @param obj
 * @returns {{}}
 */
export function createFormItemObjError(obj) {
    let target = {}
    for(let[key,value] of Object.entries(obj)){
        target[key] = Form.createFormField(value)
    }
    return target
}

/**
 * store回显到表单的处理
 * @param obj
 * @returns {{}}
 */
export function createFormItemObj(obj) {
    let target = {}
    for(let[key,value] of Object.entries(obj)){
        target[key] = Form.createFormField({value})
    }
    return target
}


/**
 * 将对象转化为url参数
 */
export function objToUrlParams(data){
    let queryStr = '';
    for (let [key, value] of Object.entries(data)) {
        if (value) {
            queryStr += `&${key}=${value}`;
        }
    }
    return queryStr ? queryStr.substring(1) : '';
}

/**
 * 获取url中的参数并转化为对象
 * @param str
 * @returns {{}}
 */
export function getUrlParmas(str) {
    let obj = {}
    str.substring(1).split('&').forEach(item => {
        const arr = item.split('=')
        obj[arr[0]] = arr[1]
    })
    return obj
}

/**
 * 富文本上传image的函数
 */
export function uploadImage (blobInfo, success, failure){
    const formData = new FormData()
    formData.append('type', 'file')
    formData.append('file', blobInfo.blob())
    fetch(`${process.env.REACT_APP_API_UPLOAD_URL}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'x-access-token': isAuthenticated(),
        },
        body: formData
    }).then(response => {
        return response.text()
    }).then(text => {
        success(text)
    })
}

export function simplify(obj){
    let target = {}
    for(let key of Object.entries(obj)){
        target[key] = {value: obj[key]}
    }
    return target
}

/**
 * 根据文件过滤
 * @param file
 * @returns {boolean}
 */

export function getPattern(file) {
    let pattern = new RegExp("^.*?\\.(jpg|bmp|png|mp4|wmv|rar|zip|doc|docx|xls|xlsx|JPG|BMP|PNG|MP4|WMV|RAR|ZIP|DOC|DOCX|XLS|XLSX|txt|ppt)$")
    let name = file.name.substring(file.name.lastIndexOf("."),file.name.length)
    return pattern.test(name)
}

export function getFileFormat(file) {
    let pattern = new RegExp("^.*?\\.(php|sh|asp|aspx|jsp|html|htm)$")
    let name = file.name.substring(file.name.lastIndexOf("."),file.name.length)
    return pattern.test(name)
}

export function getPhotoPattern(file) {
    let pattern = new RegExp("^.*?\\.(png|jpg|jpeg|bmp|PNG|JPG|JPEG|BMP)$")
    let name = file.name.substring(file.name.lastIndexOf("."),file.name.length)
    return pattern.test(name)
}
