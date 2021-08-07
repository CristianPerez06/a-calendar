import React from 'react'
import { getYear, format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { getCalendarValues } from '../common/utilities'
import CalendarItem from './CalendarItem'

const calendarIntervals = [
  { from: 0, to: 7 },
  { from: 7, to: 14 },
  { from: 14, to: 21 },
  { from: 21, to: 28 },
  { from: 28, to: 35 },
  { from: 35, to: 42 }
]
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Calendar = (props) => {
  const { selectedDate } = props

  const selectedMonthName = format(selectedDate, 'LLLL', { locale: enUS })
  const selectedYear = getYear(selectedDate)

  const allCalendarItems = getCalendarValues(selectedDate)

  return (
    <div className='calendar'>
      <div className='calendar-header w-100 text-center pb-2 font-weight-bold'>
        {`${selectedMonthName.toUpperCase()} - ${selectedYear}`}
      </div>
      <div className='container-fluid'>
        <div className='row'>
          {dayNames.map((item, index) => <div className='col p-0' key={index}><CalendarItem item={item} isTitle /></div>)}
        </div>
        {calendarIntervals.map((interval, intervalIndex) => {
          return (
            <div className='row' key={intervalIndex}>
              {allCalendarItems.slice(interval.from, interval.to).map((calendarItem, calendarItemIndex) => {
                return (
                  <div className='col p-0' key={`${intervalIndex}-${calendarItemIndex}`}>
                    <CalendarItem item={calendarItem} />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
