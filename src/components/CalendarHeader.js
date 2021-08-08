import React from 'react'
import { Card } from 'reactstrap'

const CalendarHeader = (props) => {
  // Props
  const { item } = props

  return (
    <div className='calendar-header text-center' style={{ cursor: 'default' }}>
      <Card style={{ height: 50 + 'px' }}>
        {item}
      </Card>
    </div>
  )
}

export default CalendarHeader
