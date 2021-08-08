import React, { useState } from 'react'
import { Calendar } from '../../components'
import { Button, Card } from 'reactstrap'
import { addMonths, subMonths } from 'date-fns'

const MyCalendar = (props) => {
  // State
  const [selectedDate, setSelectedDate] = useState(new Date())

  const onPrevMonthClicked = () => {
    const prevMonth = subMonths(selectedDate, 1)
    setSelectedDate(prevMonth)
  }

  const onNextMonthClicked = () => {
    const nextMonth = addMonths(selectedDate, 1)
    setSelectedDate(nextMonth)
  }

  return (
    <div className='my-calendar-container h-100 w-100 d-flex justify-content-center align-items-center'>
      <Card className='my-calendar-container shadow' style={{ width: 850 + 'px' }}>
        <Calendar className='calendar' selectedDate={selectedDate} />
        <div className='pagination d-flex justify-content-between'>
          <Button
            color='secondary'
            className='previous-month-button m-2 w-100'
            onClick={onPrevMonthClicked}
          >
            {'<<<'}
          </Button>
          <Button
            color='secondary'
            className='next-month-button m-2 w-100'
            onClick={onNextMonthClicked}
          >
            {'>>>'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default MyCalendar
