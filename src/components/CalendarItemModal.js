import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { format } from 'date-fns'
import { RemindersList, ReminderEditor } from '../components'

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
        <RemindersList />
        <ReminderEditor date={selectedDate} />
      </ModalBody>
      <ModalFooter>
        <Button
          color='secondary'
          onClick={onCloseClick}
          disabled={isBussy}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CalendarItemModal
