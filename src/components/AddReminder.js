import React, { useState } from 'react'
import { Card, Input, Button } from 'reactstrap'
import TimePicker from 'react-time-picker'
import { startOfDay, addHours, addMinutes, getUnixTime } from 'date-fns'
import { addReminderToList } from '../actions/reminderActions'
import { COLORS_LIST } from '../common/constants'
import { connect } from 'react-redux'

const defaultTime = '09:00'
const defaultColor = { value: 'default', label: 'Default' }

const AddReminder = (props) => {
  // Props
  const {
    date,
    color = { ...defaultColor },
    addReminderToList
  } = props

  // State
  const [reminderText, setReminderText] = useState()
  const [reminderTime, setReminderTime] = useState(defaultTime)
  const [reminderColor, setReminderColor] = useState(color)

  // Handlers
  const onReminderTextChange = (e) => {
    setReminderText(e.target.value)
  }

  const onReminderTimeChange = (e) => {
    setReminderTime(e)
  }

  const onReminderColorChange = (e) => {
    const selectedColor = COLORS_LIST.find(color => color.label === e.target.value)
    setReminderColor(selectedColor)
  }

  const onAddButtonClicked = (e) => {
    const hoursAndMinutes = reminderTime.split(':')
    const currentStartOfDay = startOfDay(date)

    let reminderDateTime = startOfDay(currentStartOfDay)
    reminderDateTime = addHours(reminderDateTime, hoursAndMinutes[0])
    reminderDateTime = addMinutes(reminderDateTime, hoursAndMinutes[1])

    const reminder = {
      reminderId: getUnixTime(reminderDateTime),
      date: reminderDateTime,
      text: reminderText,
      color: reminderColor
    }

    addReminderToList({ id: getUnixTime(currentStartOfDay), reminder })
    cleanUpState()
  }

  // Other
  const cleanUpState = () => {
    setReminderText('')
    setReminderTime(defaultTime)
    setReminderColor(defaultColor)
  }

  return (
    <Card className='mt-4'>
      <span className='text-center bg-light'>New reminder</span>
      <hr className='m-0' />
      <div className='add-reminder p-2' style={{ maxHeight: 250 + 'px', overflowX: 'hidden', overflowY: 'auto' }}>
        <Input
          type='input'
          className='ml-auto mr-auto'
          placeholder='Reminder...'
          value={reminderText || ''}
          maxLength='30'
          onChange={onReminderTextChange}
        />
        <div className='clock-button-container d-flex justify-content-around mt-2'>
          <div className='row text-center'>
            <div className='col-md-4 col-xs-6 mb-1'>
              <TimePicker
                onChange={onReminderTimeChange}
                value={reminderTime}
                disableClock
                clearIcon={null}
              />
            </div>
            <div className='col-md-4 col-xs-6 mb-1'>
              <select
                value={reminderColor.label}
                onChange={onReminderColorChange}
                className={`form-select text-${reminderColor.value}`}
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
            <div className='col-md-4 col-xs-12 mb-1'>
              <Button className='p-1' color='outline-secondary' disabled={!reminderText} onClick={onAddButtonClicked} style={{ fontSize: 13 + 'px' }}>
                Add reminder
              </Button>
            </div>
          </div>

        </div>
      </div>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  addReminderToList
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReminder)
