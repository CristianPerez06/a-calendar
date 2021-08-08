import React from 'react'
import { shallow } from 'enzyme'
import CalendarHeader from './CalendarHeader'

describe('In calendar header', () => {
  const dayName = 'Mon'

  describe('when rendered', () => {
    const wrapper = shallow(
      <CalendarHeader item={dayName} />
    )

    const calendarHeader = wrapper.find('.calendar-header')
    it('should show a header', () => {
      expect(calendarHeader.length).toEqual(1)
    })

    it('should show a day name', () => {
      expect(calendarHeader.find('Card').dive().text()).toEqual(dayName)
    })
  })
})
