import React, { useState } from 'react'
import { Input } from 'reactstrap'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-date-picker'
import { startOfDay, getHours, getMinutes, addHours, addMinutes, getUnixTime } from 'date-fns'
import { COLORS_LIST } from '../common/constants'

const buttonAsLinkStyles = { borderStyle: 'none', background: 'none', textDecoration: 'underline' }
const editableFieldStyles = { maxHeight: 25 + 'px' }

const EditReminder = (props) => {
  // Props
  const { item, onSaveClicked, onCancelClicked } = props
  const hours = getHours(item.date)
  let minutes = getMinutes(item.date).toString()
  if (minutes.length === 1) {
    minutes = `0${minutes}`
  }

  // State
  const [editableColor, setEditableColor] = useState(item.color)
  const [editableText, setEditableText] = useState(item.text)
  const [editableTime, setEditableTime] = useState(`${hours}:${minutes}`)
  const [editableDate, setEditableDate] = useState(item.date)

  // Button handlers
  const onSavechangesClicked = () => {
    const hoursAndMinutes = editableTime.split(':')
    const currentStartOfDay = startOfDay(editableDate)

    let reminderDateTime = startOfDay(currentStartOfDay)
    reminderDateTime = addHours(reminderDateTime, hoursAndMinutes[0])
    reminderDateTime = addMinutes(reminderDateTime, hoursAndMinutes[1])

    const updatedReminder = {
      reminderId: getUnixTime(reminderDateTime),
      date: reminderDateTime,
      text: editableText,
      color: editableColor,
      oldReminderId: item.reminderId
    }

    onSaveClicked({ updatedReminder: updatedReminder, id: getUnixTime(currentStartOfDay) })
  }

  const onEditableDateChange = (e) => {
    setEditableDate(e)
  }

  const onEditableTimeChange = (e) => {
    setEditableTime(e)
  }

  const onEditableTextChange = (e) => {
    setEditableText(e.target.value)
  }

  const editableColorChange = (e) => {
    const selectedColor = COLORS_LIST.find(color => color.label === e.target.value)
    setEditableColor(selectedColor)
  }

  return (
    <div className='edit-reminder p-2' style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      <div className='edit-reminder-fields'>
        <div className='reminder-text-and-colors d-flex justify-content-between'>
          <Input
            type='input'
            className='ml-0'
            placeholder='Reminder...'
            value={editableText || ''}
            maxLength='30'
            style={{ ...editableFieldStyles, maxWidth: 350 + 'px' }}
            onChange={onEditableTextChange}
          />

          <select
            defaultValue={editableColor.label}
            onChange={editableColorChange}
            className={`form-select text-${editableColor.value}`}
            style={editableFieldStyles}
          >
            {COLORS_LIST.map((option, index) => {
              return (
                <option key={index} className={`text-${option.value}`}>
                  {option.label}
                </option>
              )
            })}
          </select>
        </div>
        <div className='date-time-pickers d-flex justify-content-center pt-2'>
          <TimePicker
            onChange={onEditableTimeChange}
            value={editableTime}
            disableClock
            clearIcon={null}
            className='pr-1'
            style={editableFieldStyles}
          />
          <DatePicker
            onChange={onEditableDateChange}
            value={editableDate}
            disableCalendar
            clearIcon={null}
            style={editableFieldStyles}
            format='y/MM/dd'
          />
        </div>

      </div>
      <div className='edit-reminder-button d-flex justify-content-end'>
        <button className='p-0 m-0' style={buttonAsLinkStyles} onClick={onSavechangesClicked}>Save</button>
        <button className='p-0 m-0 pl-2' style={buttonAsLinkStyles} onClick={onCancelClicked}>Cancel</button>
      </div>
    </div>
  )
}

export default EditReminder
