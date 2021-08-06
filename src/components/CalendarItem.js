import React, { useState } from 'react'
import { Card } from 'reactstrap'
import { getDate, format } from 'date-fns'
import CalendarItemModal from './CalendarItemModal'

const MOCKED_DATA = [
  { date: new Date(), text: 'a reminder', color: 'danger' },
  { date: new Date(), text: 'other thing', color: 'success' },
  { date: new Date(), text: 'something else', color: 'info' },
  { date: new Date(), text: 'last one', color: 'warning' }
]

const CalendarItem = (props) => {
  // Props
  const { item, isTitle = false } = props

  // State
  const [modalIsOpen, setModalIsOpen] = useState(false)

  // Button handlers
  const onItemClicked = () => {
    setModalIsOpen(true)
  }

  const onCancelClicked = () => {
    setModalIsOpen(false)
  }

  // Other
  const value = isTitle
    ? item
    : item && getDate(item)

  const isToday = value && !isTitle && (format(new Date(item), 'MM/dd/yyyy') === format(new Date(), 'MM/dd/yyyy'))

  const customClass = value
    ? 'calendar-item ' + (isTitle ? 'text-center ' : '') + (isToday ? 'border border-info' : '')
    : 'empty-calendar-item text-center bg-light'

  const itemIsClickable = (value && !isTitle)

  const cursorProp = itemIsClickable ? 'pointer' : 'default'
  const calendarItemStyle = { cursor: cursorProp }

  return (
    <div className='calendar-item' style={calendarItemStyle} onClick={itemIsClickable ? onItemClicked : undefined}>
      <Card className={customClass} style={{ height: 100 + 'px' }}>
        {value || '-'}
        {(value && !isTitle) && (
          <>
            {MOCKED_DATA.map((reminder, index) => {
              return <div key={index} className={`bg-${reminder.color}`} style={{ fontSize: 10 + 'px', filter: 'grayscale(40%)', opacity: 0.5 }}>
                {reminder.text}
              </div>
            })}
          </>
        )}
      </Card>
      {modalIsOpen && (
        <CalendarItemModal
          selectedDate={item}
          modalIsOpen={modalIsOpen}
          onCloseClick={onCancelClicked}
        />
      )}
    </div>
  )
}

export default CalendarItem
