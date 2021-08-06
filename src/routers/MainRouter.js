import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { MyCalendar } from '../scenes/MyCalendar'

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/my-calendar' name='MyCalendar' exact component={MyCalendar} />
        <Route exact path='/'>
          <Redirect to='/my-calendar' />
        </Route>
      </Switch>
    </Router>
  )
}

export default MainRouter
