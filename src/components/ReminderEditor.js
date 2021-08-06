import React, { useState } from 'react'
import { Card, Input, Button } from 'reactstrap'
import TimePicker from 'react-time-picker'
// import { startOfDay, addHours, addMinutes } from 'date-fns'

const COLORS_LIST = [
  { value: 'default', label: 'Default' },
  { value: 'primary', label: 'Blue' },
  { value: 'secondary', label: 'Light grey' },
  { value: 'success', label: 'Green' },
  { value: 'danger', label: 'Red' },
  { value: 'warning', label: 'Yellow' },
  { value: 'info', label: 'Light blue' },
  { value: 'dark', label: 'Dark grey' }
]

const ReminderEditor = (props) => {
  // Props
  const { date, color = {} } = props

  // State
  const [reminderText, setReminderText] = useState('')
  const [reminderTime, setReminderTime] = useState('09:00')
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

  // const onAddButtonClicked = () => {
  //   let reminderDateTime = startOfDay(date)
  //   reminderDateTime = addHours(reminderDateTime, 2)
  //   reminderDateTime = addMinutes(reminderDateTime, 2)

  //   const reminder = {
  //     date: reminderDateTime,
  //     text: reminderText,
  //     color: reminderColor
  //   }
  // }

  return (
    <Card className='mt-4'>
      <span className='text-center bg-light'>New reminder</span>
      <hr className='m-0' />
      <div className='add-event p-2' style={{ maxHeight: 250 + 'px', overflowX: 'hidden', overflowY: 'auto' }}>
        <Input
          type='input'
          className='ml-auto mr-auto'
          placeholder='Reminder...'
          maxLength='30'
          onChange={onReminderTextChange}
        />
        <div className='clock-button-container d-flex justify-content-around mt-2'>
          <TimePicker
            onChange={onReminderTimeChange}
            value={reminderTime}
            disableClock
            clearIcon={null}
          />
          <select
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
          <Button
            color='outline-secondary'
            disabled={reminderText.length === 0}
            // onClick={onAddButtonClicked}
          >
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ReminderEditor
