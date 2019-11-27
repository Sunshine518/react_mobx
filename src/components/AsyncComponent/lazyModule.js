import React from 'react';
import AsyncComponent from './AsyncComponent'

export default function lazyModule(moduleName, importFun) {
    let Component=AsyncComponent(importFun)
    Component.MODULE_NAME = moduleName
    return Component
}
