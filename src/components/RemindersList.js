import React from 'react'
import { Card } from 'reactstrap'
import { getUnixTime } from 'date-fns'
import { connect } from 'react-redux'
import ReminderListItem from './ReminderListItem'

const RemindersList = (props) => {
  // Props
  const { date, remindersObj } = props
  const { data } = remindersObj

  const currentDate = data.items.find(x => x.id === getUnixTime(date))
  const remindersExist = currentDate && currentDate.reminders.length !== 0

  return (
    <Card>
      <span className='text-center bg-light'>Reminders list</span>
      <hr className='m-0' />
      <div className='events-list' style={{ maxHeight: 250 + 'px', overflowX: 'hidden', overflowY: 'auto' }}>
        {!remindersExist && (
          <div className='w-100 text-center mt-2 mb-2'>
            <span className='text-center'>No events</span>
          </div>
        )}
        {remindersExist && currentDate.reminders.sort((a, b) => a.reminderId - b.reminderId).map((item, index) => {
          const itemWithId = { ...item, id: currentDate.id }
          return <ReminderListItem key={index} item={itemWithId} />
        })}
      </div>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    remindersObj: state.reminders
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(RemindersList)
