import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Calendar } from '../scenes/Calendar'

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/calendar' name='Calendar' exact component={Calendar} />
        <Route exact path='/'>
          <Redirect to='/calendar' />
        </Route>
      </Switch>
    </Router>
  )
}

export default MainRouter
