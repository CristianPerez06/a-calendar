import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Calendar from './Calendar'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('Calendar feature', () => {
  const store = mockStore({
    reminders: {
      data: {
        items: []
      }
    }
  })

  const selectedDate = new Date(2021, 8, 1)
  const wrapper = mount(
    <Provider store={store}>
      <Calendar selectedDate={selectedDate} />
    </Provider>
  )

  it('should show a title', () => {
    const title = wrapper.find('.calendar-title')
    expect(title.text()).toEqual('SEPTEMBER - 2021')
  })

  const itemsContainer = wrapper.find('.calendar-items-container')

  const HEADER_SPOTS_COUNT = 7
  it(`should always show ${HEADER_SPOTS_COUNT} calendar headerspots`, () => {
    expect(itemsContainer.find('.calendar-header-spot').length).toEqual(HEADER_SPOTS_COUNT)
  })

  const ROWS_COUNT = 7
  it(`should always have ${ROWS_COUNT} rows`, () => {
    expect(itemsContainer.find('.calendar-row').length).toEqual(ROWS_COUNT)
  })

  const SPOTS_COUNT = 42
  it(`should always show ${SPOTS_COUNT} calendar spots`, () => {
    expect(itemsContainer.find('.calendar-spot').length).toEqual(SPOTS_COUNT)
  })
})
