import React, { Component } from 'react'
import {injectIntl} from 'react-intl'
import localeStore from '@/stores/LocaleStore'
import "babel-polyfill"

const frontend = require(`@/project/routers`).default
const config=require(`@/project/config`).default

@injectIntl
class App extends Component {

  async componentDidMount() {
    await localeStore.initLocaleInServer()
      document.title = config.title
      this.createFavicon(config.favicon)
  }

  //创建页头icon及标题
    createFavicon(href){
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = href;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

  render () {
    return (
      <div>
        {frontend}
      </div>
    )
  }
}

export default App
