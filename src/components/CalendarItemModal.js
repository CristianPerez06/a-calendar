import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { format } from 'date-fns'
import { RemindersList, AddReminder } from '../components'

const CalendarItemModal = (props) => {
  const {
    selectedDate,
    modalIsOpen,
    isBussy,
    onCloseClick
  } = props

  return (
    <Modal isOpen={modalIsOpen} toggle={onCloseClick} disabled>
      <ModalHeader className='bg-secondary text-white' toggle={onCloseClick} disabled>
        {format(new Date(selectedDate), 'EEEE, MMMM do, yyyy')}
      </ModalHeader>
      <ModalBody>
        <RemindersList date={selectedDate} />
        <AddReminder date={selectedDate} />
      </ModalBody>
      <ModalFooter>
        <Button
          color='secondary'
          onClick={onCloseClick}
          disabled={isBussy}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CalendarItemModal
