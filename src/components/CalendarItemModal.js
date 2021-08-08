import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { format } from 'date-fns'
import { RemindersList, AddReminder } from '../components'

const CalendarItemModal = (props) => {
  const {
    selectedDate,
    modalIsOpen,
    onCloseClick
  } = props

  return (
    <Modal isOpen={modalIsOpen} toggle={onCloseClick} disabled>
      <ModalHeader className='bg-secondary text-white' toggle={onCloseClick} disabled>
        {format(new Date(selectedDate), 'EEEE, MMMM do, yyyy')}
      </ModalHeader>
      <ModalBody>
        <RemindersList date={selectedDate} className='reminders-list' />
        <AddReminder date={selectedDate} className='add-reminder' />
      </ModalBody>
      <ModalFooter>
        <Button
          color='secondary'
          onClick={onCloseClick}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CalendarItemModal
