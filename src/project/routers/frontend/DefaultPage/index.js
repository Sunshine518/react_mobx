import React from 'react'
import { Route, Redirect, } from 'react-router-dom'

import {isAuthenticated} from '../../../../framework/utils/Session'

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={() => (
        !!isAuthenticated()
            ?  <Redirect to='/home/ch/modularA'/>
            :
            <Redirect to='/login'/>
    )}
    />
)

export default PrivateRoute