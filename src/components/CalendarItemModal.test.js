import React from 'react'
import { shallow } from 'enzyme'
import CalendarItemModal from './CalendarItemModal'

describe('In calendar item modal', () => {
  describe('when opened', () => {
    const wrapper = shallow(
      <CalendarItemModal selectedDate={new Date(2021, 8, 1)} modalIsOpen />
    )

    const calendarModal = wrapper.find('Modal')

    const calendarModalHeader = calendarModal.find('ModalHeader')
    it('should show a modal header', () => {
      expect(calendarModalHeader.length).toEqual(1)
    })

    describe('modal header', () => {
      it('should show a date', () => {
        expect(calendarModalHeader.dive().text()).toEqual('Wednesday, September 1st, 2021')
      })
    })

    const calendarModalBody = calendarModal.find('ModalBody')
    it('should show a modal body', () => {
      expect(calendarModalBody.length).toEqual(1)
    })

    describe('modal body', () => {
      it('should show a Reminders list', () => {
        expect(calendarModal.find('.reminders-list').length).toEqual(1)
      })
      it('should show a Add reminder', () => {
        expect(calendarModal.find('.add-reminder').length).toEqual(1)
      })
    })

    const calendarModalFooter = calendarModal.find('ModalFooter')
    it('should show a modal footer', () => {
      expect(calendarModalFooter.length).toEqual(1)
    })

    describe('modal footer', () => {
      it('should contain a Cancel button', () => {
        const button = calendarModalFooter.find('Button').dive()
        expect(button.length).toEqual(1)
        expect(button.first().text()).toEqual('Close')
      })
    })
  })
})
