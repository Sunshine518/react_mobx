const {injectBabelPlugin} = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less-modules')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = function override (config, env) {

  config = injectBabelPlugin(
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    config
  )
  config = injectBabelPlugin(
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
    config,
  )
  config = rewireLess(config, env)
  config = rewireLess.withLoaderOptions({
    modifyVars: {'@layout-header-background': '#2f4050',
        '@font-size-base': '12px',
        '@menu-dark-bg':'#001529',
        '@layout-sider-background':'#001529',
        '@tabs-bar-margin': '0'
    },
    javascriptEnabled: true,
  })(config, env)
  config.resolve.alias = {
    '@': resolve('src')
  }
  return config
}