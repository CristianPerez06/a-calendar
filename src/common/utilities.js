import { startOfMonth, endOfMonth, getDay, eachDayOfInterval } from 'date-fns'

const TOTAL_CALENDAR_ITEMS = 42
const DAYS_IN_A_WEEK = 7

export const calculateFillFirstDays = (dayOfWeek) => {
  return dayOfWeek === 0
    ? -1
    : dayOfWeek - 1
}

export const calculateFillLastDays = (dayOfWeek) => {
  return dayOfWeek === 0
    ? 6
    : DAYS_IN_A_WEEK - (dayOfWeek + 1)
}

export const getCalendarValues = (date) => {
  // First (empty) calendar items
  const firstDateOfMonth = startOfMonth(date)
  const firstDayOfMonth = getDay(firstDateOfMonth)
  const daysToFirstDayOfMonth = calculateFillFirstDays(firstDayOfMonth)
  const firstCalendarItems = []
  for (let i = 0; i <= daysToFirstDayOfMonth; i++) {
    firstCalendarItems.push(null)
  }

  // Last (empty) calendar items
  const lastDateOfMonth = endOfMonth(date)
  const lastDayOfMonth = getDay(lastDateOfMonth)
  const daysFromLastDayOfMonth = calculateFillLastDays(lastDayOfMonth)
  const lastCalendarItems = []
  for (let i = 0; i < daysFromLastDayOfMonth; i++) {
    lastCalendarItems.push(null)
  }

  // Month calendar items
  const calendarItems = eachDayOfInterval({ start: firstDateOfMonth, end: lastDateOfMonth })

  const allCalendarItems = [
    ...firstCalendarItems,
    ...calendarItems,
    ...lastCalendarItems
  ]

  // Fill with more empty calendar items if needed
  if (allCalendarItems.length !== TOTAL_CALENDAR_ITEMS) {
    const remainingItems = TOTAL_CALENDAR_ITEMS - allCalendarItems.length
    for (let i = 0; i < remainingItems; i++) {
      allCalendarItems.push(null)
    }
  }

  return allCalendarItems
}
