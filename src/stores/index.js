import appStore from "./AppStore";
import localeStore from './LocaleStore'

const stores = require(`../project/stores`)

export default {
    appStore,
    localeStore,
  ...stores.default
}