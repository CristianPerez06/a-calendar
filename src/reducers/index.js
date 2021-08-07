import { combineReducers } from 'redux'
import reminders from './reminderReducer'

// to combine all reducers together
const appReducer = combineReducers({
  reminders
})

export default appReducer
