import {
  GET_REMINDERS_LIST,
  ADD_REMINDER_TO_LIST,
  UPDATE_REMINDER_IN_LIST,
  REMOVE_REMINDER_FROM_LIST
} from './reminderTypes'

export const getRemindersList = (reminder) => {
  return {
    type: GET_REMINDERS_LIST,
    payload: reminder
  }
}

export const addReminderToList = (reminder) => {
  return {
    type: ADD_REMINDER_TO_LIST,
    payload: reminder
  }
}

export const updateReminderInList = (reminder) => {
  return {
    type: UPDATE_REMINDER_IN_LIST,
    payload: reminder
  }
}

export const removeReminderFromList = (reminder) => {
  return {
    type: REMOVE_REMINDER_FROM_LIST,
    payload: reminder
  }
}
