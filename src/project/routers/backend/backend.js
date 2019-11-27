import React from 'react'
import lazyModule from '../../../components/AsyncComponent/lazyModule'

//common公共模块
const 销售ERP = lazyModule('销售ERP', () => import('./A'))
const 生产MES = lazyModule('生产MES', () => import('./A'))


const backendTabs = {
    销售ERP,
    生产MES,
}

export default backendTabs
