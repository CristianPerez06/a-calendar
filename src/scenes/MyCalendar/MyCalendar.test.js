import React from 'react'
import { shallow } from 'enzyme'
import MyCalendar from './MyCalendar'

describe('In My Calendar scene', () => {
  const wrapper = shallow(
    <MyCalendar />
  )

  const myCalendar = wrapper.find('Card').dive()
  it('should show a calendar', () => {
    expect(myCalendar.find('.calendar').length).toEqual(1)
  })

  const paginationSection = myCalendar.find('.pagination')
  it('should show a pagination section', () => {
    expect(paginationSection.length).toEqual(1)
  })

  describe('Pagination section', () => {
    it('should show a button to go to previous month', () => {
      expect(paginationSection.find('.previous-month-button').length).toEqual(1)
    })

    it('should show a button to go to next month', () => {
      expect(paginationSection.find('.next-month-button').length).toEqual(1)
    })
  })
})
