import React from 'react'
import { getYear, format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { getCalendarValues, mapRemindersToCalendarItems } from '../common/utilities'
import { CALENDAR_INTERVALS, DAY_NAMES } from '../common/constants'
import CalendarItem from './CalendarItem'
import CalendarHeader from './CalendarHeader'
import { connect } from 'react-redux'

const Calendar = (props) => {
  const { selectedDate, remindersObj } = props
  const { data } = remindersObj

  const selectedMonthName = format(selectedDate, 'LLLL', { locale: enUS })
  const selectedYear = getYear(selectedDate)

  const allCalendarItems = getCalendarValues(selectedDate)
  const calendarItemsWithReminders = mapRemindersToCalendarItems(allCalendarItems, data.items)

  return (
    <div className='calendar'>
      <div className='calendar-header w-100 text-center pb-2 font-weight-bold'>
        {`${selectedMonthName.toUpperCase()} - ${selectedYear}`}
      </div>
      <div className='container-fluid'>
        <div className='row'>
          {DAY_NAMES.map((item, index) => <div className='col p-0' key={index}><CalendarHeader item={item} /></div>)}
        </div>
        {CALENDAR_INTERVALS.map((interval, intervalIndex) => {
          return (
            <div className='row' key={intervalIndex}>
              {calendarItemsWithReminders.slice(interval.from, interval.to).map((calendarItem, calendarItemIndex) => {
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

const mapStateToProps = (state) => {
  return {
    remindersObj: state.reminders
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
