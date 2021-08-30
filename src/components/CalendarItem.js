import React, { useState } from 'react'
import { Card } from 'reactstrap'
import { getDate, format } from 'date-fns'
import CalendarItemModal from './CalendarItemModal'

const CalendarItem = (props) => {
  // Props
  const { item } = props

  // State
  const [modalIsOpen, setModalIsOpen] = useState(false)

  // Button handlers
  const onItemClicked = () => {
    setModalIsOpen(true)
  }

  const onCloseClicked = () => {
    setModalIsOpen(false)
  }

  // Other
  const value = item && getDate(item.date)
  const reminders = item && item.reminders
  const isToday = value && (format(new Date(item.date), 'MM/dd/yyyy') === format(new Date(), 'MM/dd/yyyy'))
  const customClass = value
    ? 'calendar-item ' + (isToday ? 'border border-info' : '')
    : 'empty-calendar-item text-center bg-light'
  const cursorProp = value ? 'pointer' : 'default'
  const calendarItemStyle = { cursor: cursorProp }

  return (
    <div style={calendarItemStyle} onClick={value ? onItemClicked : undefined}>
      <Card className={customClass} style={{ height: 75 + 'px' }}>
        {value || '-'}
        {value && reminders && (
          <>
            {reminders.sort((a, b) => a.reminderId - b.reminderId).map((reminder, index) => {
              return (
                <div key={index} className={`border border-${reminder.color.value}`} style={{ fontSize: 10 + 'px', filter: 'grayscale(40%)', opacity: 0.5 }}>
                  {reminder.text}
                </div>
              )
            })}
          </>
        )}
      </Card>
      {modalIsOpen && (
        <CalendarItemModal
          selectedDate={item.date}
          modalIsOpen={modalIsOpen}
          onCloseClick={onCloseClicked}
        />
      )}
    </div>
  )
}

export default CalendarItem
