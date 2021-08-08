import React from 'react'
import { shallow } from 'enzyme'
import CalendarItem from './CalendarItem'

describe('In calendar item', () => {
  describe('when rendered item corresponds to date of previous month', () => {
    const wrapper = shallow(
      <CalendarItem item={null} />
    )

    const emptyCalendarItem = wrapper.find('Card').dive().find('.empty-calendar-item')

    it('should show an empty card', () => {
      expect(emptyCalendarItem.length).toEqual(1)
    })

    it('should show a hyphen in its content', () => {
      expect(emptyCalendarItem.first().text()).toEqual('-')
    })
  })

  describe('when rendered item corresponds to date of current month', () => {
    const item = {
      date: new Date(2021, 8, 1)
    }

    const wrapper = shallow(
      <CalendarItem item={item} />
    )

    const calendarItem = wrapper.find('Card').dive().find('.calendar-item')

    it('should show a card', () => {
      expect(calendarItem.length).toEqual(1)
    })

    it('should show a day number in its content', () => {
      expect(calendarItem.first().text()).toEqual('1')
    })
  })
})
