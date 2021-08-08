import reminderReducer from './reminderReducer'
import * as types from '../actions/reminderTypes'

describe('reminder reducer', () => {
  describe('when reminder is added', () => {
    const ID = 'UNIX-TIME-ONLY-DATE'
    const REMINDER = {
      reminderId: 'UNIX-TIME-DATE-AND-TIME',
      color: { label: 'Red', value: 'danger' },
      text: 'A simple reminder',
      date: new Date(2021, 7, 5)
    }
    const EMPTY_STATE = {
      data: {
        items: []
      }
    }

    const addReminderExpectedRes = {
      data: {
        items: [
          { id: ID, reminders: [{ ...REMINDER }] }
        ]
      }
    }

    const addReminderAction = {
      type: types.ADD_REMINDER_TO_LIST,
      payload: { id: ID, reminder: { ...REMINDER } }
    }

    it('should add a new item to reminders list', () => {
      expect(reminderReducer(EMPTY_STATE, addReminderAction)).toEqual(addReminderExpectedRes)
    })
  })

  describe('when reminder is updated', () => {
    const ID = 'UNIX-TIME-ONLY-DATE'
    const REMINDER = {
      reminderId: 'UNIX-TIME-DATE-AND-TIME',
      color: { label: 'Red', value: 'danger' },
      text: 'A simple reminder',
      date: new Date(2021, 7, 5)
    }
    const UPDATED_REMINDER = {
      reminderId: 'UNIX-TIME-DATE-AND-TIME-UPDATED',
      color: { label: 'Yellow', value: 'warning' },
      text: 'A simple reminder - updated',
      date: new Date(2022, 7, 5)
    }
    const UPDATE_REMINDER_PAYLOAD = {
      id: ID,
      reminder: {
        oldReminderId: REMINDER.reminderId,
        ...UPDATED_REMINDER
      }
    }

    const NOT_EMPTY_STATE = {
      data: {
        items: [
          { id: ID, reminders: [{ ...REMINDER }] }
        ]
      }
    }

    const updateReminderExpectedRes = {
      data: {
        items: [
          { id: ID, reminders: [{ ...UPDATED_REMINDER }] }
        ]
      }
    }

    const updateReminderAction = {
      type: types.UPDATE_REMINDER_IN_LIST,
      payload: { ...UPDATE_REMINDER_PAYLOAD }
    }

    it('should update a reminder contained in reminders list', () => {
      expect(reminderReducer(NOT_EMPTY_STATE, updateReminderAction)).toEqual(updateReminderExpectedRes)
    })
  })

  describe('when reminder is removed', () => {
    const ID = 'UNIX-TIME-ONLY-DATE'
    const REMINDER = {
      reminderId: 'UNIX-TIME-DATE-AND-TIME',
      color: { label: 'Red', value: 'danger' },
      text: 'A simple reminder',
      date: new Date(2021, 7, 5)
    }

    const NOT_EMPTY_STATE = {
      data: {
        items: [
          { id: ID, reminders: [{ ...REMINDER }] }
        ]
      }
    }

    const removeReminderExpectedRes = {
      data: {
        items: []
      }
    }

    const removeReminderAction = {
      type: types.REMOVE_REMINDER_FROM_LIST,
      payload: { id: ID, reminder: { ...REMINDER } }
    }

    it('should remove a reminder contained in reminders list', () => {
      expect(reminderReducer(NOT_EMPTY_STATE, removeReminderAction)).toEqual(removeReminderExpectedRes)
    })
  })
})
