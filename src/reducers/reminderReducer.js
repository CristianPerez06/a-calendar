import {
  GET_REMINDERS_LIST,
  ADD_REMINDER_TO_LIST,
  UPDATE_REMINDER_IN_LIST,
  REMOVE_REMINDER_FROM_LIST
} from '../actions/reminderTypes'

const initialState = {
  data: {
    items: []
  }
}

const addToList = (list, id, item) => {
  const itemInList = list.find(x => x.id === id)
  // Current date doesn't have any reminders
  if (!itemInList) {
    list.push({ id: id, reminders: [item] })
  }
  // Current date does have reminders
  if (itemInList) {
    itemInList.reminders.push(item)
  }
  return list
}

const updateList = (list, id, item) => {
  const itemInList = list.find(x => x.id === id)

  // Remove item from list
  const filteredList = list.filter(x => x.id !== id)

  // Filter reminder that's going to be replaced
  const filteredReminders = itemInList.reminders.filter(x => x.reminderId !== item.oldReminderId)
  // Insert same reminder with updated data
  itemInList.reminders = [
    ...filteredReminders,
    {
      reminderId: item.reminderId,
      color: item.color,
      text: item.text,
      date: item.date
    }
  ]

  // Update list
  filteredList.push(itemInList)

  return filteredList
}

const removeFromList = (list, id, item) => {
  const itemInList = list.find(x => x.id === id)

  // Remove item from list
  const filteredList = list.filter(x => x.id !== id)

  // Current date has only one reminder
  if (itemInList && itemInList.reminders.length === 1) {
    return filteredList
  }

  // Current date has more than one reminder
  const filteredReminders = itemInList.reminders.filter(x => x.reminderId !== item.reminderId)
  itemInList.reminders = [...filteredReminders]

  // Update list
  filteredList.push(itemInList)

  return filteredList
}

export default function common (state = initialState, action) {
  switch (action.type) {
    case GET_REMINDERS_LIST:
      return state
    case ADD_REMINDER_TO_LIST:
      return {
        ...state,
        data: {
          ...state.data,
          items: addToList([...state.data.items], action.payload.id, action.payload.reminder)
        }
      }
    case UPDATE_REMINDER_IN_LIST:
      return {
        ...state,
        data: {
          ...state.data,
          items: updateList([...state.data.items], action.payload.id, action.payload.reminder)
        }
      }
    case REMOVE_REMINDER_FROM_LIST:
      return {
        ...state,
        data: {
          ...state.data,
          items: removeFromList([...state.data.items], action.payload.id, action.payload.reminder)
        }
      }
    default:
      return state
  }
}
