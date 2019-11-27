import React from 'react'
import {IntlProvider,addLocaleData} from "react-intl";
import { ConfigProvider  } from 'antd'
import enLocale from "react-intl/locale-data/en";
import zhLocale from "react-intl/locale-data/zh";

//添加国际化语言翻译包，LocaleProvider为antd国际化组件
addLocaleData([...enLocale, ...zhLocale])
const MobxIntlProviderChild = ({localeStore, children, ...props}) => {
    return (
        <IntlProvider locale={localeStore.locale.locale} messages={localeStore.locale.messages}
                      formats={localeStore.locale.formats} {...props}>
            <ConfigProvider  locale={localeStore.locale.antd}>
                {children}
            </ConfigProvider >
        </IntlProvider>
    )
}

export default MobxIntlProviderChild