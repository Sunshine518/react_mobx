import favicon from './favicon.ico'

//开发环境配置
const dev = {

}

//生产环境配置
const prod = {

}

const config = () => {
    switch (process.env.REACT_APP_PROFILE) {
        case 'dev': return dev
        case 'prop': return prod
        default: return {}
    }
}

export default {
    title: '武汉宏承天佑技术汽车服务有限公司',
    favicon: favicon,

    //阿里测试服配置
    apiUrl: 'api',
    REACT_APP_API_UPLOAD_URL:'http://apii.aonestep.com/onestep/upload/file/upload',

    REACT_APP_CATALOG_URL:4,
    REACT_APP_CATALOG2_URL:3,
    REACT_APP_COMPANY:{"frontend":9,"backend":8,"pageId": "246e2580-b4d0-11e8-83c3-6fba56808002"},
    companyId:8,
    company:'gepc',
    tencentVideoSdkAppId:1400210887,
    passwordZCYS:'1234567890',
    ...config()
}
