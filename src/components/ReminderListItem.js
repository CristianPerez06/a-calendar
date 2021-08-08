import React, { useState } from 'react'
import { format } from 'date-fns'
import { connect } from 'react-redux'
import { addReminderToList, updateReminderInList, removeReminderFromList } from '../actions/reminderActions'
import EditReminder from './EditReminder'

const buttonAsLinkStyles = { borderStyle: 'none', background: 'none', textDecoration: 'underline' }

const ReminderListItem = (props) => {
  // Props
  const { item, addReminderToList, updateReminderInList, removeReminderFromList } = props

  // State
  const [editMode, setEditMode] = useState(false)

  // Button handlers
  const onEditClicked = () => {
    setEditMode(true)
  }

  const onSaveEditClicked = (modifiedItem) => {
    const { updatedReminder, id } = modifiedItem
    if (id !== item.id) {
      // Remove reminder (has new date)
      const formattedItemToRemove = { id: item.id, reminder: { reminderId: item.reminderId } }
      removeReminderFromList(formattedItemToRemove)

      // Add reminder (has new date)
      const formattedItemToAdd = { id: id, reminder: updatedReminder }
      addReminderToList(formattedItemToAdd)
    } else {
      // Update reminder (has same date)
      const formattedItem = { id: item.id, reminder: updatedReminder }
      updateReminderInList(formattedItem)
    }
    setEditMode(false)
  }

  const onCancelEditClicked = () => {
    setEditMode(false)
  }

  const onDeleteClicked = () => {
    const formattedItemToRemove = {
      id: item.id,
      reminder: { reminderId: item.reminderId }
    }
    removeReminderFromList(formattedItemToRemove)
  }

  return (
    <div className='reminder-list-item'>
      {!editMode && (
        <div className={`d-flex justify-content-between pl-2 pr-2 border border-${item.color.value}`}>
          <div className='time-text-container'>
            <span>{format(item.date, 'h:mm a')}</span> - <span className='font-weight-light font-italic'>{item.text}</span>
          </div>
          <div className='buttons-container'>
            <button className='text-info p-0 m-0' style={buttonAsLinkStyles} onClick={onEditClicked}>Edit</button>
            <button className='text-danger p-0 m-0 pl-2' style={buttonAsLinkStyles} onClick={onDeleteClicked}>Delete</button>
          </div>
        </div>
      )}
      {editMode && <EditReminder item={item} onSaveClicked={onSaveEditClicked} onCancelClicked={onCancelEditClicked} />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  addReminderToList,
  updateReminderInList,
  removeReminderFromList
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderListItem)
