import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import TasksCrud from '../components/tasks/TasksCrud'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/tasks' component={TasksCrud} />
        <Redirect from='*' to='/' />
    </Switch>